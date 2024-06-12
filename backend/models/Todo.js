const mongoose=require('mongoose')

const TodoSchema=new mongoose.Schema({
    tasks:String,
    done:{
        type:Boolean,
        default:false
    }
})

const TodoModel=mongoose.model("todo",TodoSchema)

module.exports=TodoModel