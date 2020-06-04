const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const path=require('path');

 var urlEncodedParser=bodyParser.urlencoded({extended: true});

module.exports = function(app){
    

    app.get('/ownerLogin',function(req,res){
        res.render('ownerLogin.ejs');
    });
    // let ownerid;

    // app.post('/ownerLogin',urlEncodedParser,function(req,res){
    //     if(req.body.aadhaar == "1234567890" && req.body.password=="12345678"){
    //         ownerid=req.body.aadhaar;
    //         exports.ownerset=function(req,res){
    //             let owner=ownerid;
    //         }
    //         return res.redirect('ownerHome');
    //     }
    //     else{
    //         res.send("Wrong credentials");
    //     }
    // });

    app.get('/ownerHome',function(req,res){
        res.render('ownerHome.ejs');
    });
    app.get('/ownerUpload',function(req,res){
        res.render('ownerUpload.ejs');
    });

    // app.post('/ownerUpload',urlEncodedParser,function(req,res){
    //     var resource = new Resource();
    //     resource.ownerid = ownerid;
    //     resource.basePrice=req.body.basePrice;
    //     resource.capacity=req.body.capacity;
    //     resource.status="pending";

        // console.log(req.file);

        // var file=req.files.filetoupload;
        // var filename=file.name;
        // resource.name=filename;

        // file.mv('./resourceFiles/'+filename);
        // var fpath='./resourceFiles/'+filename;
        // resource.filePath=fpath;


    //     resource.save((err)=>{
    //         if(!err){
    //             console.log("save record")
    //             res.redirect('fileupload');
    //         }
    //         else{
    //             console.log("error during insertion:"+ err);
    //         }
    //     });
    // });

    // app.get('/fileupload',function(req,res){
    //     res.render('fileupload.ejs');
    // });

    // app.post('/fileupload',function(req,res){
    //     // var resource = new Resource();
    //     if(req.files){
    //         console.log(req.files);
    //     }

    //     // var file=req.files.file;
    //     // var filename=file.name;
    //     // resource.name=filename;

    //     // file.mv('./resourceFiles/'+filename);
    //     // var fpath='./resourceFiles/'+filename;
    //     // resource.filePath=fpath;
    //     // resource.save((err)=>{
    //     //     if(!err){
    //     //         console.log("file record")
    //     //         res.redirect('ownerHome');
    //     //     }
    //     //     else{
    //     //         console.log("error during insertion:"+ err);
    //     //     }
    //     // });

    // })




    };