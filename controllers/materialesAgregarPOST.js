
const material = require('../models/materiales.js');
const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{
    await material.create(req.body);
    await Producto.updateOne({ $push: {MaterialesProductos: {nombre:req.body.Descripcion ,cantidad:0,codigo:req.body.codigo} }});
    res.redirect('/materiales');
}


