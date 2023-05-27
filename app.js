const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
// const bodyparser=require("body-parser");
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser: true});

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    adress:{
        type:String
    },
    desc:{
        type:String
    },

  });

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("The item has been send to the database")
    }).catch(()=>{
        res.status(400).send("Item has not saved to the Database")
    })

    // res.status(200).render('contact.pug',params);
});

app.get('/home', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});