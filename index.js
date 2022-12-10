const express = require('express')
const app = new express()
const path = require('path')
app.use(express.static('public'))
const ejs = require('ejs')
app.set('view engine','ejs')

app.listen(3000, ()=>{
console.log('App listening on port 3000')
})

const inicioController= require('./controllers/inicio')



app.get('/',inicioController)
