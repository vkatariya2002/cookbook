const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

const app=express();

const db=mongoose.connect('mongodb+srv://katariyavishal2002:jY1L5fSIvisBBqgM@cluster0.nhalfoj.mongodb.net/cookbookdb?retryWrites=true&w=majority&appName=Cluster0')
.then(data=>console.log('Database Connected Successfully.'))
.catch(error=>console.log(error));

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true
    },
    password: {
        type: String
    }
},{timestamps: true});
  
const users = mongoose.model('users', userSchema);

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hi');
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    users.create({
        email: req.body.email,
        password: req.body.password
    }).then(data=>{
        res.json({status: 'success'});
    }).catch(error=>{
        console.log(error);
        res.json({status: 'failure'});
    })
})

app.post('/login',(req,res)=>{
    users.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(data=>{
        console.log(data);
        if(data===null) res.json({status: 'failure'});
        else res.json({email: req.body.email,status: 'success'});
    })
    .catch(error=>{
        console.log(error);
        res.json({status: 'failure'});
    })

})

app.post('addRecipe',(req,res)=>{
    
})

app.listen(80,error=>{
    if(error) console.log(error);
    else console.log('Server Started Successfully.');
})