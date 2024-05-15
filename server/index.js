const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const db = mongoose.connect('mongodb+srv://katariyavishal2002:jY1L5fSIvisBBqgM@cluster0.nhalfoj.mongodb.net/cookbookdb?retryWrites=true&w=majority&appName=Cluster0')
    .then(data => console.log('Database Connected Successfully.'))
    .catch(error => console.log(error));

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    selfRecipes: [String],
    favoriteRecipes: [String]
}, { timestamps: true });

const users = mongoose.model('users', userSchema);

const recipeSchema = new mongoose.Schema({
    cooking_time: Number,
    createdAt: String,
    id: String,
    image_url: String,
    ingredients: [String],
    publisher: String,
    servings: Number,
    title: String,
}, { timestamps: true })

const recipes = mongoose.model('recipes', recipeSchema);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send('Hi');
})

app.post('/register', (req, res) => {
    console.log(req.body);
    users.create({
        email: req.body.email,
        password: req.body.password
    }).then(data => {
        res.json({ status: 'success' });
    }).catch(error => {
        console.log(error);
        res.json({ status: 'failure' });
    })
})

app.post('/login', (req, res) => {
    users.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(data => {
        console.log(data);
        if (data === null) res.json({ status: 'failure' });
        else res.json({ email: req.body.email,selfRecipes:data.selfRecipes,favRecipes:data.favoriteRecipes, status: 'success' });
    })
        .catch(error => {
            console.log(error);
            res.json({ status: 'failure' });
        })

})

app.post('/addRecipe', (req, res) => {
    // recipes.create({
    //     cooking_time: req.body.cooking_time,
    //     createdAt: req.body.createdAt,
    //     id: req.body.id,
    //     image_url: req.body.image_url,
    //     ingredients: req.body.ingredients,
    //     publisher: req.body.publisher,
    //     servings: req.body.servings,
    //     title: req.body.title
    // }).then(data => {
    //     res.json({ status: 'success' });
    // }).catch(error => {
    //     console.log(error);
    //     res.json({ status: 'failure' });
    // })
    users.findOneAndUpdate({ email: req.body.email },
        { $push: { selfRecipes: req.body.id } })
        .then(data => {
            res.json({ status: 'success' });
        }).catch(error => {
            console.log(error);
            res.json({ status: 'failure' });
        })
})


//const Recipe = require('/Recipe');

app.get('/recipeList', async (req, res) => {
    try {
        const recipeList = await recipes.find({});
        res.json({ recipes: recipeList });
    }
    catch (err) {
        console.error('error fetching recipes', err);
        res.status(500).json({ error: 'internal server error' });
    }
});

// app.post('/addtf',(req,res)=>{
//     console.log(req.body);
//     if(req.body.action==='add'){
//         users.findOneAndUpdate({ email: req.body.email },
//             { $push: { favoriteRecipes: req.body.id } })
//             .then(data => {
//                 res.json({ status: 'success' });
//             }).catch(error => {
//                 console.log(error);
//                 res.json({ status: 'failure' });
//             })
//     }
//     else if(req.body.action==='subtract'){
//         users.findOneAndUpdate({ email: req.body.email },
//             { $pop: { favoriteRecipes: req.body.id } })
//             .then(data => {
//                 res.json({ status: 'success' });
//             }).catch(error => {
//                 console.log(error);
//                 res.json({ status: 'failure' });
//             })
//     }
// })

app.post('/addtf', (req, res) => {
    console.log(req.body);
    if (req.body.action === 'add') {
        users.findOneAndUpdate(
            { email: req.body.email },
            { $push: { favoriteRecipes: req.body.id } }
        )
        .then(data => {
            res.json({ status: 'success' });
        })
        .catch(error => {
            console.log(error);
            res.json({ status: 'failure' });
        });
    } else if (req.body.action === 'subtract') {
        users.findOneAndUpdate(
            { email: req.body.email },
            { $pull: { favoriteRecipes: req.body.id } }
        )
        .then(data => {
            res.json({ status: 'success' });
        })
        .catch(error => {
            console.log(error);
            res.json({ status: 'failure' });
        });
    }
});
app.get('/getallusers',async (req,res)=>{
    try{
        const response=await users.find({},'email selfRecipes');
        res.json({'data':response});
    }
    catch(error){
        conole.log(error);
        res.json({'data':'failed'});
    }
})

app.get('/getusr/:id',async (req,res)=>{
    try{
        const response=await users.findOne({_id:req.params.id}, 'selfRecipes');
        console.log(response);
        res.json(response);
    }
    catch(error){
        conole.log(error);
        res.json({'data':'failed'});
    }
})

app.listen(80, error => {
    if (error) console.log(error);
    else console.log('Server Started Successfully.');
})