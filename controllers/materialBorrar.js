const material = require('../models/materiales.js');
const path = require('path');
const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{


   
     await material.deleteOne({Codigo:req.params.id});
     await Producto.updateOne({ $pull: {MaterialesProductos: {codigo:req.params.id} }});
     await Producto.updateOne({ $pull: {PinturaProductos: {codigo:req.params.id} }});
     await Producto.updateOne({ $pull: {InstalacionProductos: {codigo:req.params.id} }});

     res.redirect('/materiales');
}

