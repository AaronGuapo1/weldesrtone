const Producto = require('../models/Productos.js');
const path = require('path');

module.exports =  async (req,res)=>{   


    if(req.body.IdProducto !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{IdProducto:req.body.IdProducto}});
    }

    if(req.body.nombre !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{nombre:req.body.nombre}});
    }
    if(req.body.precio !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{precio:req.body.precio}});
    }

    if(req.body.descripcion !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{descripcion:req.body.descripcion}});
    }

  
    try {


        var image = req.files.image;
        console.log(image)

        image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{

            await Producto.updateOne({nombre:req.body.NombreBusqueda},{ $set:{ image: '/img/' + image.name}});
    
        })
    }
    

    
    

    catch (error) {

    }
    finally {
        res.redirect('/productos')

    }
    
 
}
    
