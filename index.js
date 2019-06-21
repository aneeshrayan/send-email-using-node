const express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
var path = require('path');

var upload = multer({dest:'uploads/'});
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',express.static('views'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }

  })
   
var upload = multer({ storage: storage })

app.post('/',upload.single('file_cv'),(req,res)=>{
    var personName = req.body.name;
    var personEmail = req.body.email;
    var message = req.body.message;
    var filename = req.file.file_cv;
    


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        source: true,
        auth:{
            user:'rayan3188@gmail.com',
            pass: 'rayancha31'
        }

    });
    let mailOptions = {
    from: "rayan3188@gmail.co",
    to: "saianeeshrayancha@gmail.com",
    subject: message,
    text: message,
    html: "Message Body",
    attachments:[
        {
            path: `./uploads/${req.file.filename}`
        }
    ]
}
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
        }
        console.log(info.response);

    });

    res.end();

});

app.listen(port,(req,res)=>{
    console.log("Working");
})