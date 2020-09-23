const express = require('express')
var XLSX = require('xlsx')
const mongoose = require('mongoose');
const cors = require('cors')


const adminRoutes = require('./routes/admin/auth');
const addcar = require('./routes/admin/addcar');

mongoose.connect('mongodb+srv://rohit:Rohit@123@pandey.265oq.mongodb.net/day1?retryWrites=true&w=majority',
{ useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}).then(()=>{console.warn("db connected");});



const app = express();
app.use(express.json())
app.use(cors())
app.use('/api', adminRoutes)
app.use('/api', addcar)


// get file api 
app.get('/getfile/:filename', (req,res)=>{
    var workbook = XLSX.readFile('./uploads/'+req.params.filename);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    res.send(xlData)
})


app.listen(2000, ()=>{
    console.log("server is runnning on port "+ 2000)
})