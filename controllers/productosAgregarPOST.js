const Producto = require('../models/Productos.js');
const path = require('path');

module.exports = async (req,res)=>{   

    await Producto.create({...req.body});

        for (a=0; a<req.body['MaterialesProductos[cantidad]'].length;a++){
                await Producto.updateOne({nombre:req.body.nombre}, { $push: {MaterialesProductos: { nombre:req.body['MaterialesProductos[nombre]'][a] ,cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a]}}});
            
        }


        try {
            let image = req.files.image;
        
            image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
                await Producto.updateOne({nombre:req.body.nombre},{ $set:{ image: '/img/' + image.name}} )
        
            })
            }
            catch (error) {
        
            }
            finally {
                res.redirect('/productos')
            }

        
       
    
}
    

/*
const Producto = require('../models/Productos.js');
const path = require('path');

module.exports = (req,res)=>{   


    let image = req.files.image;

    image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
        await Producto.create({...req.body, image: '/img/' + image.name});

        for (a=0; a<req.body['MaterialesProductos[cantidad]'].length;a++){
                await Producto.updateOne({nombre:req.body.nombre}, { $push: {MaterialesProductos: { nombre:req.body['MaterialesProductos[nombre]'][a] ,cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a]}}});
            
        }
        
        res.redirect('/productos')
    })
}

*/