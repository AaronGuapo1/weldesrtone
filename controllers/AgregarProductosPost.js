const Producto = require('../models/Productos.js')
const fileUpload = require('express-fileupload')
const path = require('path')

module.exports = (req,res)=>{
    console.log(req.body.MaterialesProductos)
    

    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
    await Producto.create({
    ...req.body,
    image: '/img/' + image.name

    
    })


    res.redirect('/AgregarProductos')
    })
    }
    