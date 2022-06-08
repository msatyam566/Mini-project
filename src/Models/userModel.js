const mongoose = require('mongoose')
const objectId=mongoose.Schema.Types.objectId


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    phone : {
        type : String,
        required : true,
        unique : true,
        trim : true
    
    },
    
    email: {
        required: true,
        type: String,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },
    Role:{
        type: String,
        required:true,
        trim:true
    }
}, { timestamps: true });


module.exports=mongoose.model("createbook1",userSchema)