const Newcar = require("../../models/car");

const slugify = require("slugify");
const express = require('express');
const bodyParser = require("body-parser");
const app = (express());
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

exports.AddCar = (req, res) => {


  let carImg = null;
  let specdtl = null;
  let icons = [];


  req.files.map((file) => {
    if (file.fieldname === "carimage") {
      carImg = file.filename;
    }
    else if (file.fieldname === "spec") {
      icons.push(file.filename)
    }
    else if(file.fieldname === "specdtl"){
      specdtl = file.filename;
    }
  });

  
  let specifications = []
  for (i = 0; i < icons.length; i++) {
    specifications.push({icon:icons[i], spec:req.body.spec[i]})
  }



  const new_car = new Newcar({
    CarName: req.body.name,
    slug: slugify(req.body.name),
    CarImg: carImg,
    Specification: specifications,

    specdtl: specdtl,
  });



console.log(new_car)


    new_car.save((error, data) => {
     if (data) {
       res.status(200).json({ data: data })
       
     } else {
       console.log("Something wrong")	
       res.status(400).json({ error: error })
     }
   })

};



// get car data
// -----------------------

exports.GetCar = (req, res) => {
  Newcar.find({}, (err, data) => {
    if (data)
      res.status(200).json({ data: data })
  })
};


