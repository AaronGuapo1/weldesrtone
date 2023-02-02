const Producto = require('../models/Productos.js');
const path = require('path');
const material = require('../models/materiales.js');
const Cart = require("../models/Cart");

module.exports =  async (req,res)=>{   


    if(req.body.IdProducto !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{IdProducto:req.body.IdProducto}});

    }

    if(req.body.nombre !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{nombre:req.body.nombre}});
        await Cart.update({nombre:req.body.NombreBusqueda},{$set:{nombre:req.body.nombre}});

    }


    if(req.body.descripcion !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{descripcion:req.body.descripcion}});
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

    if(req.body.CapacidadCarga !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{CapacidadCarga:req.body.CapacidadCarga}});
    }

  if(req.body.CaracEsp !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{CaracEsp:req.body.CaracEsp}});
    }
    if(req.body.Color !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{Color:req.body.Color}});
    }
    if(req.body.Material !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{Material:req.body.Material}});
    }
    if(req.body.NombreMarca !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{NombreMarca:req.body.NombreMarca}});
    }
    if(req.body.NumArt !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{NumArt:req.body.NumArt}});
    }
    if(req.body.NumPiezas !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{NumPiezas:req.body.NumPiezas}});
    }
    if(req.body.Tamaño !== '' ){
        await Producto.updateOne({nombre:req.body.NombreBusqueda},{$set:{Tamaño:req.body.Tamaño}});
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
                console.log(materiales[i].Descripcion )
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
    var SubTotal=Math.round(x)
    console.log(SubTotal)
    
    await Producto.updateOne({_id:productos[a]._id},{ $set: { precio:SubTotal } });
    await Cart.update({nombre:productos[a].nombre},{$set: { precio:SubTotal } });

    
    }
    
    try {


        var image = req.files.image;
        console.log(image)

        image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{

            await Producto.updateOne({nombre:req.body.NombreBusqueda},{ $set:{ image: '/img/' + image.name}});
            await Cart.update({nombre:req.body.NombreBusqueda},{ $set:{ image: '/img/' + image.name}});

        })
    }
    

    
    

    catch (error) {

    }
    finally {
        res.redirect('/productos')

    }
    
 
}
    
