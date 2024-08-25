const mongoose =require('mongoose');

let userSchema=mongoose.Schema({
    
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
},{ timestamps: true })

const user_Model = mongoose.model("user_", userSchema);

module.exports = user_Model;
