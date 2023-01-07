const material = require('../models/materiales.js');
const path = require('path');
const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{


   
     await material.deleteOne({Codigo:req.params.id});
     await Producto.updateOne({ $pull: {MaterialesProductos: {codigo:req.params.id} }});

     res.redirect('/materiales');
}

   /*


const material = require('../models/materiales.js');
const path = require('path');
const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{
     const ProductosBorrarMateriales= await Producto.find({})
for(a=0;a<ProductosBorrarMateriales.length;a++){
     var {MaterialesProductos} = ProductosBorrarMateriales[a];
     await Producto.updateOne({  $pull: {MaterialesProductos: {codigo:req.params.id} }});

     
}
     await material.deleteOne({Codigo:req.params.id});

     res.redirect('/materiales');
}

   
   */