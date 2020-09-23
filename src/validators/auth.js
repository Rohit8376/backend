const {check, validationResult} = require('express-validator')

exports.validateeRequest = 
[
    check('firstname').notEmpty().withMessage("first name is required"),
    check('lastname').notEmpty().withMessage("last name is required"),
    check('email').isEmail().withMessage("please enter your valid email"),
    check('password').isLength({min:6}).withMessage("password must be atleast 6 character long")   
]


exports.validatesigninrequest = 
[
    check('email').isEmail().withMessage("please enter your valid email"),
    check('password').isLength({min:6}).withMessage("password must be atleast 6 character long")   
]

exports.isrequestvalidated = (req,res,next)=>{
    const erors = validationResult(req);
    if(erors.array().length>0){
        return res.status(400).json({error:erors.array()[0].msg })
    }
    next()
}