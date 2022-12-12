const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');

app.use(express.static('public'))

app.set('view engine','ejs')

app.listen(3000, ()=>{
console.log('App listening on port 3000')
})

const inicioController= require('./controllers/inicio')
const TiendaController= require('./controllers/tienda')

mongoose.set('strictQuery', true);

//mongoose.connect('mongodb+srv://Aaron:tamales@aaronproyecto.sfdk1.mongodb.net/Woolderstone', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});



    
app.get('/',inicioController)
app.get('/tienda',TiendaController)
