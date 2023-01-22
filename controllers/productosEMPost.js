const Producto = require('../models/Productos.js');
const path = require('path');
module.exports = async (req,res)=>{   





for (a=0; a<req.body['MaterialesProductos[cantidad]'].length;a++){


    await Producto.updateOne({nombre:req.body.ProductoAEditar}, { $set: {"MaterialesProductos.$[item]":{Descripcion:req.body['MaterialesProductos[nombre]'][a],cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a],familia:req.body['MaterialesProductos[familia]'][a],preciounitario:req.body['MaterialesProductos[preciounitario]'][a]}}}, {arrayFilters: [{"item.codigo":req.body['MaterialesProductos[codigo]'][a]}]});


    
}


for (b=0; b<req.body['PinturaProductos[cantidad]'].length;b++){
    await Producto.updateOne({nombre:req.body.ProductoAEditar}, { $set: {"PinturaProductos.$[item]":{Descripcion:req.body['PinturaProductos[nombre]'][b],cantidad:req.body['PinturaProductos[cantidad]'][b],codigo:req.body['PinturaProductos[codigo]'][b],familia:req.body['PinturaProductos[familia]'][b],preciounitario:req.body['PinturaProductos[preciounitario]'][b]}}}, {arrayFilters: [{"item.codigo":req.body['PinturaProductos[codigo]'][b]}]});

}

for (c=0; c<req.body['InstalacionProductos[cantidad]'].length;c++){
    await Producto.updateOne({nombre:req.body.ProductoAEditar}, { $set: {"InstalacionProductos.$[item]":{Descripcion:req.body['InstalacionProductos[nombre]'][c],cantidad:req.body['InstalacionProductos[cantidad]'][c],codigo:req.body['InstalacionProductos[codigo]'][c],familia:req.body['InstalacionProductos[familia]'][c],preciounitario:req.body['InstalacionProductos[preciounitario]'][c]}}}, {arrayFilters: [{"item.codigo":req.body['InstalacionProductos[codigo]'][c]}]});

}

res.redirect('/productos');

}
    


