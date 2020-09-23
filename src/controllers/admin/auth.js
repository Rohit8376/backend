const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const env = require("dotenv");


exports.signup = (req, res) => {

    User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "admin already exist or registered",
    });

    const { firstname, lastname, email, password } = req.body;
    const _user = new User({firstname,lastname,email,password,username: firstname+"_"+Math.random().toString(),role:"admin" } );
    console.log(req.body)
    
    _user.save((error, data) => {
      if (error) {
        return res.json({
          message: "samething may be wrong",
          error: error,
        });
      }

      if (res) {
        return res.status(201).json({
          user :data,
          message: " admin updated successfully",
        });
      }

    });
  });
};



// --------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ message: erroe });

    if (user) {
      if (user.authenticate(req.body.password) ) {
         const token = jwt.sign({ _id: user._id }, "SOMETHING", {
          expiresIn: "20h",
        });

        const { firstname, lastname, email, role, fullname } = user;

        return res.status(200).json({
          token,
          user: {firstname,lastname,email,role,fullname,},
        });
      } else {
        return res.status(400).json({ message: "incorrect Password" });
		console.log("incorrect password");
      }
    } else {
      return res.status(400).json({ message: "admin not exist " });
	  console.log("admin not exist");
    }
  });
};




