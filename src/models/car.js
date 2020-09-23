const mongoose = require('mongoose')
const slugify = require('slugify');



const CarSchema = new mongoose.Schema({

    CarName :{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
  
    slug:{type:String,unique:true},

    CarImg : {
        type:String,
        required:true,
        trim:true,
        min:3,
        max:15
    },


    Specification : [
        { icon:{type:String}, spec : {type:String} }
    ],


    specdtl : {
        type:String
    }


    
},{timestamps:true})


module.exports = mongoose.model('Car_details',CarSchema)