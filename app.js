const express= require("express");
const path=require("path");
const app=express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/ContactData');
  }
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const contact = mongoose.model('contact', ContactSchema);
const port=8000;
//Express stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded({ extended: true }));

//Pug Stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Endpoints
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the Database');
    }).catch(()=>{
        res.send('There is an error in saving data');
    })
});

//Start the server
 app.listen(port,()=>{
    console.log(`The application is started successfully on port ${port}`);
 });