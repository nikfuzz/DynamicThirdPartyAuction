const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://NikhilDhoot:dbPass123@practice-jnubr.gcp.mongodb.net/Auction?retryWrites=true&w=majority',{useNewUrlParser: true},(err)=>{
    if(!err){
        console.log("Connection successful")
    }
});

require('./resources.model');