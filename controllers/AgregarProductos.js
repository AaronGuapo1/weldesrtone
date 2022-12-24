const Producto = require('../models/Productos.js')


module.exports = async (req, res) =>{
    const Productos = await Producto.find({})
    res.render('AgregarProductos',{Productos})
    }
