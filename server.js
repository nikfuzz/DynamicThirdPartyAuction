require('./Models/db');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var ownerController = require('./Controllers/owner');
var userController = require('./Controllers/user');
var govController = require('./Controllers/gov');
const Resource = mongoose.model('Resource');

var urlEncodedParser=bodyParser.urlencoded({extended: true});

app=express();
upload=require('express-fileupload');
app.use(upload())
app.set('view engine','ejs');


app.get('/',function(req,res){
    res.render('index.ejs');
})



let ownerid;

    app.post('/ownerLogin',urlEncodedParser,function(req,res){
        if(req.body.aadhaar == "1234567890" && req.body.password=="12345678"){
            ownerid=req.body.aadhaar;
            return res.redirect('ownerHome');
        }
        else{
            res.send("Wrong credentials");
        }
    });

app.post('/ownerUpload',urlEncodedParser ,function(req,res){
    var resource = new Resource();
        resource.ownerid = ownerid;
        resource.basePrice=req.body.basePrice;
        resource.capacity=req.body.capacity;
        resource.status="pending";

    if(req.files){
        console.log(req.files);
    }

    var file=req.files.filename;
    var filename=file.name;
    resource.name=filename;

    file.mv('./resourceFiles/'+filename);
    var fpath='./resourceFiles/'+filename;
    resource.filePath=fpath;
    resource.save((err)=>{
        if(!err){
            console.log("file record")
            res.redirect('ownerHome');
        }
        else{
            console.log("error during insertion:"+ err);
        }
    });

});

app.get('/ownerStatus',function(req,res){
    Resource.find({"ownerid":ownerid},function(err,resources){
        res.render('ownerStatus.ejs',{resources:resources});
    });
});



ownerController(app);
userController(app);
govController(app);




var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("App listening at http://%s", host, port)
 });