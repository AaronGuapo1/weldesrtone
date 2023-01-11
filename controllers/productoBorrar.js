
const path = require('path');
const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{


    await Producto.deleteOne({nombre:req.params.id});
  

     res.redirect('/productos');
}