const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {


    if(req.headers.authorization){

        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        req.user = user;
        }else{
            return res.status(400).json({message:"invalid authorization"})
        }  
        next();
  };

  exports.usermiddleware = (req,res,next)=>{

 
      if(req.user.role!=='user') return res.status(400).json({message:"user accesse denide"});

        next()
  }


  exports.adminmiddleware = (req,res,next)=>{

    console.log(req.user.role)
 
      if(req.user.role!=='admin') return res.status(400).json({message:"admin accesse denide"});

        next()
}