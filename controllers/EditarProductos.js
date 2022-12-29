const Producto = require('../models/Productos.js')
const Material = require('../models/materiales.js')
const grades = require('../models/prueba.js')


/*
const options ={
    page:1,
    limit:20
  
}
*/



module.exports = async (req, res) =>{
    console.log(req.body)
    const materiales = await Material.find({})
    const productos = await Producto.find({})
    //const calificaciones = await grades.find({})
    //console.log(calificaciones)
    res.render('EditarProductos',{productos,materiales})
    }
