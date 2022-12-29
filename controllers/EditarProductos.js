const Producto = require('../models/Productos.js')
const Material = require('../models/materiales.js')
const grades = require('../models/prueba.js')


module.exports = async (req, res) =>{
    console.log(req.body)
    const materiales = await Material.find({})
    const productos = await Producto.find({})
    console.log(productos[2].MaterialesProductos[0].nombre);
    //const calificaciones = await grades.find({})
    //console.log(calificaciones)
    res.render('EditarProductos',{productos,materiales})
    }
