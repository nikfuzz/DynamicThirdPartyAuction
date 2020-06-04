const mongoose = require('mongoose');

var resourcesSchema = new mongoose.Schema({
    ownerid:{
        type: Number,
        required: 'This field is required'
    },
    name:{
        type: String
    },
    capacity:{
        type: Number
    },
    basePrice:{
        type: Number 
    },
    users:[{
        id: Number,
        price: Number,
        target: Number,
        score: Number,
        approval:String
    }],
    filePath:{
        type: String
    },
    status:{
        type: String
    }
});


mongoose.model('Resource',resourcesSchema);