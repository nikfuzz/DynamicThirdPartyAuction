const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const path=require('path');

 var urlEncodedParser=bodyParser.urlencoded({extended: true});

module.exports = function(app){
    
    app.get('/govHome',function(req,res){
        res.render('govHome.ejs');
    });
    let score;
    app.get('/govBid',(req,res)=>{
        
        Resource.find(function(err,doc){
            for(let i=0;i<doc.length;i++){
                let basePrice=doc[i].basePrice;
                let capacity = doc[i].capacity;
                let score;
               
                //console.log(doc[i].users[0].price);
                doc[i].users.forEach(function(ele){
                    score=0;

                 if(ele.price>=((1.2)*basePrice)){
                        score+=(30+(ele.price-(1.2)*basePrice));
                    }
                    let count=0;
                    doc[i].users.forEach(function(check){
                        if(ele.id==check.id){
                            count++;
                        }
                    });
                    if(count>3){
                        score+=20;
                    }
                    if(ele.target >= (1.1)*doc[i].capacity && ele.target<=(0.9)*doc[i].capacity){
                        score+=10;
                     }

                     console.log(ele.id);
                     Resource.update({name: doc[i].name, 'users.id':ele.id}, {'$set': {
                        'users.$.score': score
                    }}, function(err) { if(err) console.log(err) });
                
                });
               
                    
               
            }
        })



        Resource.find({status:"pending"},function(err, resources){

            if(!err){
                res.render('govBid.ejs',{resources: resources});
            }
            else{
                console.log("Error displaying items:" + err);
            }
        });
    });

    app.post('/govBid',urlEncodedParser, function(req,res){
        Resource.find({name:req.body.resName},function(err, resources){

            if(!err){
                res.render('bidUsers.ejs',{resources: resources});
            }
            else{
                console.log("Error displaying items:" + err);
            }
        });
    });
    
    app.post('/updateBid',urlEncodedParser, function(req,res){
        console.log(req.body.user);
        console.log(req.body.resName);
        Resource.update({name: req.body.resName, 'users.id':req.body.user}, {'$set': {
            'users.$.approval': "yes",
            status: req.body.user
        }}, function(err) { if(err) console.log(err) });
        res.render('govHome.ejs')
    });





    };