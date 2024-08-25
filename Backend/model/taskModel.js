const mongoose =require('mongoose');

let taskSchema=mongoose.Schema({
    
        taskName: { type: String, required: true },
        taskStatus: { type: String,default:"TODO"},
        creatorId:{ type: String, required: true }
},{ timestamps: true })

const taskModel = mongoose.model("task_", taskSchema);

module.exports = taskModel;
