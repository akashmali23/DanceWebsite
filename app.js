const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const port = 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/akashm', {useNewUrlParser: true});
//schema
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
    
  });

  const contact = mongoose.model('contact', contactschema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post("/contact", (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
});




// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});