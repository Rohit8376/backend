const Newcar = require("../../models/car");

const slugify = require("slugify");

exports.AddCar = (req, res) => {

//  console.log(req.body)
  //console.log(req.files)



  let carImg = null;
  let specdtl = null;
  let Specification = null;

  req.files.map((file) => {
    if (file.fieldname === "carimage") {
      carImg = file.filename;
    }
    else if (file.fieldname === "spec") {
      Specification = file.filename;
    }

    else {
      specdtl = file.filename;
    }
  });

  const new_car = new Newcar({
    CarName: req.body.name,
    slug: slugify(req.body.name),
    CarImg: carImg,
    Specification: { icon: Specification, spec: req.body.spec },
    specdtl: specdtl,
  });




  new_car.save((error, data) => {
    if (data) {
      res.status(200).json({ data: data })
      console.log(new_car)
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


