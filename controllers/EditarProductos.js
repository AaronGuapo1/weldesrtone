const Producto = require('../models/Productos.js')
const Material = require('../models/materiales.js')


module.exports = async (req, res) =>{
    console.log(req.body)
    const materiales = await Material.find({})
    const productos = await Producto.find({})
    console.log(productos)
    res.render('EditarProductos',{productos,materiales})
    }
