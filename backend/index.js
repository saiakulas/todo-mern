const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const TodoModel=require('./models/Todo.js')
app.use(cors())
app.use(express.json())

app.listen(3000,()=>{
    console.log("running sucessfully")
})

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

mongoose.connect('mongodb://127.0.0.1:27017/crud').then(()=>{
    console.log('connected sucessfully')
})

app.post('/add',(req,res)=>{
   const tasks=req.body.tasks;
   TodoModel.create({
    tasks:tasks
   }).then(result=>res.json(result))
   .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndDelete({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})