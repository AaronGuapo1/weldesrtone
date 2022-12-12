// ---------------- PACKAGES ---------------- // 
const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');

// ---------------- APP CONFIG ---------------- // 
app.use(express.static('public'))
app.set('view engine','ejs')

// ---------------- SERVER ---------------- // 
app.listen(3000, ()=>{
console.log('App listening on port 3000')
})

const inicioController= require('./controllers/inicio')
const TiendaController= require('./controllers/tienda')

// ---------------- DATABASE ---------------- // 
// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://Aaron:tamales@aaronproyecto.sfdk1.mongodb.net/Woolderstone', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});

// ---------------- PAGES ---------------- // 
app.get('/', inicioController)
app.get('/tienda', TiendaController)
