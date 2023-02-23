const Producto = require('../models/Productos.js');
const path = require('path');
const material = require('../models/materiales.js');
const Cart = require("../models/Cart");

module.exports =  async (req,res)=>{   


  
    if(req.body.familia !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{familia:req.body.familia}});

    }

    if(req.body.descripcion !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{descripcion:req.body.descripcion}});
    }
    
    if(req.body.codigo !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{codigo:req.body.codigo}});
    }

    if(req.body.unidad !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{unidad:req.body.unidad}});
    }

    if(req.body.ManoObMaterial !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{ManoObMaterial:req.body.ManoObMaterial}});
    }

    if(req.body.PorcentajeMaterial !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{PorcentajeMaterial:req.body.PorcentajeMaterial}});
    }

    if(req.body.ManoObPintura !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{ManoObPintura:req.body.ManoObPintura}});
    }

    if(req.body.PorcentajePintura !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{PorcentajePintura:req.body.PorcentajePintura}});
    }
    
    if(req.body.ManoObInstalacion !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{ManoObInstalacion:req.body.ManoObInstalacion}});
    }

    if(req.body.PorcentajeInstalacion !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{PorcentajeInstalacion:req.body.PorcentajeInstalacion}});
    }





  

    await Producto.updateOne({nombre:req.body.NombreBusqueda}, {$unset: {especificacionesNombre:1}} , {multi: true});


        await Producto.updateOne({nombre:req.body.NombreBusqueda}, { $set: {especificacionesNombre:req.body.especificacionesNombre}});      

    


            await Producto.updateOne({nombre:req.body.NombreBusqueda}, {$unset: {especificacionesDesc:1}} , {multi: true});


                await Producto.updateOne({nombre:req.body.NombreBusqueda}, { $set: {especificacionesDesc:req.body.especificacionesDesc}});      


                






    for (a=0; a<req.body['MaterialesProductos[cantidad]'].length;a++){



        await Producto.updateOne({nombre:req.body.NombreBusqueda}, { $set: {"MaterialesProductos.$[item]":{Descripcion:req.body['MaterialesProductos[nombre]'][a],cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a],familia:req.body['MaterialesProductos[Familia]'][a]}}}, {arrayFilters: [{"item.codigo":req.body['MaterialesProductos[codigo]'][a]}]});
    
    
        
    }
    
    
    for (b=0; b<req.body['PinturaProductos[cantidad]'].length;b++){
        await Producto.updateOne({nombre:req.body.NombreBusqueda}, { $set: {"PinturaProductos.$[item]":{Descripcion:req.body['PinturaProductos[nombre]'][b],cantidad:req.body['PinturaProductos[cantidad]'][b],codigo:req.body['PinturaProductos[codigo]'][b],familia:req.body['PinturaProductos[Familia]'][b]}}}, {arrayFilters: [{"item.codigo":req.body['PinturaProductos[codigo]'][b]}]});
    
    }
    
    for (c=0; c<req.body['InstalacionProductos[cantidad]'].length;c++){

        await Producto.updateOne({nombre:req.body.NombreBusqueda}, { $set: {"InstalacionProductos.$[item]":{Descripcion:req.body['InstalacionProductos[nombre]'][c],cantidad:req.body['InstalacionProductos[cantidad]'][c],codigo:req.body['InstalacionProductos[codigo]'][c],familia:req.body['InstalacionProductos[Familia]'][c]}}}, {arrayFilters: [{"item.codigo":req.body['InstalacionProductos[codigo]'][c]}]});
    
    }
    



    const productos = await Producto.find({});
    const materiales = await material.find({});
    
    for (let a =0; a< productos.length; a++){
    
    const {MaterialesProductos} = productos[a];
    const {PinturaProductos} = productos[a];
    const {InstalacionProductos} = productos[a];
    
    
    var suma = 0;
    
    for (let i=0; i<MaterialesProductos.length; i++){
            if (MaterialesProductos[i].Descripcion === materiales[i].Descripcion && materiales[i].PrecioUnitario >= 0 ){
             suma = suma + (MaterialesProductos[i].cantidad *  materiales[i].PrecioUnitario)
            }
    }
    var Suma2Mano= ((suma * productos[a].ManoObMaterial)/100) + suma;
    var Suma3Por= ((Suma2Mano * productos[a].PorcentajeMaterial)/100) +Suma2Mano;
    
    var sumaSolventes = 0;
    
    for (let i=0; i<PinturaProductos.length; i++){
            if (PinturaProductos[i].Descripcion === materiales[i].Descripcion && materiales[i].PrecioUnitario >= 0 ){
                sumaSolventes = sumaSolventes + (PinturaProductos[i].cantidad *  materiales[i].PrecioUnitario)
            }
    }
    var sumaSolventes2Mano= ((sumaSolventes * productos[a].ManoObPintura)/100) + sumaSolventes;
    var sumaSolventes3Por=((sumaSolventes2Mano * productos[a].PorcentajePintura)/100) +sumaSolventes2Mano;
    
    var sumaInsumos = 0;
    
    for (let i=0; i<InstalacionProductos.length; i++){
        if (InstalacionProductos[i].Descripcion === materiales[i].Descripcion && materiales[i].PrecioUnitario >= 0 ){
            sumaInsumos = sumaInsumos + (InstalacionProductos[i].cantidad *  materiales[i].PrecioUnitario)
        }
    }
    var sumaInsumos2Mano = ((sumaInsumos * productos[a].ManoObInstalacion)/100) + sumaInsumos;
    var sumaInsumos3Por = ((sumaInsumos * productos[a].PorcentajeInstalacion)/100) + sumaInsumos2Mano;
    
    var x = Suma3Por+sumaSolventes3Por+sumaInsumos3Por;
    var SubTotal=Number(x.toFixed(2))

    //console.log(SubTotal)
    
    await Producto.updateOne({_id:productos[a]._id},{ $set: { precio:SubTotal } });
    await Cart.update({nombre:productos[a].nombre},{$set: { precio:SubTotal } });

    
    }
    
    try {


        var image = req.files.image;
        console.log(image)

        image.mv(path.resolve(__dirname,'..','public/images/productos',image.name),async (error)=>{

            await Producto.updateOne({nombre:req.body.NombreBusqueda},{ $set:{ image: '/images/productos/' + image.name}});
            await Cart.update({nombre:req.body.NombreBusqueda},{ $set:{ image: '/images/productos/' + image.name}});

        })
    }
    

    

    catch (error) {

    }
    finally {

        if(req.body.nombre !== '' ){
            await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{nombre:req.body.nombre}});
            await Cart.update({nombre:req.body.NombreBusqueda},{$set:{nombre:req.body.nombre}});
    
        }

        res.redirect('/productos')

    }
    
 
}
    



