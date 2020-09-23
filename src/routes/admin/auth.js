const express = require('express');
const { signup, signin} = require('../../controllers/admin/auth');



const { validateeRequest, isrequestvalidated , validatesigninrequest} = require('../../validators/auth');


const router = express.Router();


router.post('/admin/signup', validateeRequest,isrequestvalidated,signup)

router.post('/admin/signin',validatesigninrequest,isrequestvalidated,signin)



module.exports = router;