const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const path=require('path');

 var urlEncodedParser=bodyParser.urlencoded({extended: true});

module.exports = function(app){
    let userid;

    app.get('/userLogin',function(req,res){
        res.render('userLogin.ejs');
    });

    app.post('/userLogin',urlEncodedParser,function(req,res){
        if(req.body.password=="12345678"){
            userid=req.body.aadhaar;
            return res.redirect('userHome');
        }
        else{
            res.send("Wrong credentials");
        }
    });

    app.get('/userHome',function(req,res){
        res.render('userHome.ejs');
    });

    app.get('/userBid',(req,res)=>{
        Resource.find(function(err, resources){
            if(!err){
                res.render('userBid.ejs',{resources: resources});
            }
            else{
                console.log("Error displaying items:" + err);
            }
        });
    });



    app.post('/userBid',urlEncodedParser,function(req,res){
        resName=req.body.resName;
        // var price = req.body.price;
        // var target = req.body.target;
        // var count=Resource.find({"users.id" : userid}).count();
        // var basePrice = Resource.findOne({name : resName}).basePrice;
        // console.log(basePrice);
        // console.log(userid);

            Resource.update({name: resName, 'users.id': {'$ne':userid}},
      {$push:{ users: {id:userid, price:req.body.price, target:req.body.target, score:0, approval:"Nil"}}},{'multi': true},
          function(err,model) {
	   	if(err){
        	console.log(err);
        	return res.send(err);
        }
        return res.render('userHome.ejs');
 });
        
 
                
        });


            
    

    app.get('/userStatus',function(req,res){
        Resource.find({"users.id":userid},function(err,resources){
            console.log(resources);
            res.render('userStatus.ejs',{resources:resources});
        });
    });


    

    



    };