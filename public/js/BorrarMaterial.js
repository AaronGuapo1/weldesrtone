const material = require('../models/materiales.js')
const path = require('path')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});

const buttons = document.getElementsByClassName("BorrarMaterial");

for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const btn_id = btn.id;
    btn.addEventListener("click", function(){
       console.log("hola")
    })
}


/*

material.deleteOne({DescripcionBusqueda:req.body.DescripcionBusqueda})

*/