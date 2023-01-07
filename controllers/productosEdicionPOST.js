const Producto = require('../models/Productos.js');
const path = require('path');

module.exports =  async (req,res)=>{   


/*
    for (i=1; i<req.body.NombreBusqueda.length;i++){

        if(req.body.IdProducto[i] !== '' ){
            await Producto.updateOne({nombre:req.body.NombreBusqueda[i]},{$set:{IdProducto:req.body.IdProducto[i]}});
        }

        if(req.body.nombre[i] !== '' ){
            await Producto.updateOne({nombre:req.body.NombreBusqueda[i]},{$set:{nombre:req.body.nombre[i]}});
        }
        if(req.body.precio[i] !== '' ){
            await Producto.updateOne({nombre:req.body.NombreBusqueda[i]},{$set:{precio:req.body.precio[i]}});
        }

        if(req.body.descripcion[i] !== '' ){
            await Producto.updateOne({nombre:req.body.NombreBusqueda[i]},{$set:{descripcion:req.body.descripcion[i]}});
        }

    }
*/
    try {


        var image = req.files.image;
        //console.log(image)
        for (i=1; i<req.body.NombreBusqueda.length;i++){

        image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
            //console.log({image: '/img/' + image.name})
            //console.log(req.body.nombre)
            console.log(image[i])


            /*
            for (i=1; i<req.body.NombreBusqueda.length;i++){
                if(req.files.image[i] !== '' ){
            await Producto.updateOne({nombre:req.body.NombreBusqueda},{ $set:{ image: '/img/' + image.name}});
        }
        }
        */
        })
    }
      }

    catch (error) {

    }
    finally {
        res.redirect('/productos')

    }
 
}
    