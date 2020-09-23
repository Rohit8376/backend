const express = require('express');

const {AddCar, GetCar} = require('../../controllers/admin/addcar')

const multer = require('multer')
const path = require('path')
const router = express.Router();
const shortid= require('shortid')

const storage = multer.diskStorage({


    destination: function(req,file,cb){
        if(file.fieldname==='carimage'){
            cb(null, path.join(path.dirname(__dirname),'../carImage'))
        }else{
            cb(null, path.join(path.dirname(__dirname),'../uploads'))   
        }
    },


    filename: function(req,file,cb) {
        cb(null, shortid.generate() +"_"+file.originalname)
    }

    
})

const upload = multer({storage})

router.post('/admin/create', upload.any() , AddCar)

router.get('/getcar', GetCar)

module.exports = router;
