const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({

    firstname :{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:15
    },


    lastname :{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:15
    },

    username :{
        type:String,
        unique:true,
        index:true,
        lowercase:true,
        trim:true,
    },



  email:{
         type:String,
        required:true,
        unique:true,
        index:true,
        lowercase:true,
        trim:true,
        
  },

  hash_password:{
      type:String,
      required:true
  },


  role:{
        type:String,
        enum:['user','admin'],
        default:'user'      
},


contactnumber :{type:String},

profilePicture : {type:String}


},{timestamps:true})





userSchema.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
})



userSchema.virtual('fullname') .get(function(){
    return `${this.firstname} ${this.lastname}`
})


userSchema.methods = {
    authenticate : function(password){
      return bcrypt.compareSync(password,this.hash_password);
    }
}



module.exports = mongoose.model('User',userSchema)