const material = require('../models/materiales.js');
const path = require('path');
const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{


   
     await material.deleteOne({Codigo:req.params.id});


     const ProductosBorrar = await Producto.find({});

     for (i=0; i<ProductosBorrar.length;i++){

     await Producto.updateOne({_id:ProductosBorrar[i]._id},{ $pull: {MaterialesProductos: {codigo:req.params.id} }});
     await Producto.updateOne({_id:ProductosBorrar[i]._id},{ $pull: {PinturaProductos: {codigo:req.params.id} }});
     await Producto.updateOne({_id:ProductosBorrar[i]._id},{ $pull: {InstalacionProductos: {codigo:req.params.id} }});


}



     const MaterialesASumar = await Producto.find({})

     for (let a =0; a< MaterialesASumar.length; a++){
     const {MaterialesProductos} = MaterialesASumar[a];
     const {PinturaProductos} = MaterialesASumar[a];
     const {InstalacionProductos} = MaterialesASumar[a];
     
     var suma = 0;
     
     for (let i=0; i<MaterialesProductos.length; i++){
             if (MaterialesProductos[i].preciounitario >=0){
              suma = suma + (MaterialesProductos[i].preciounitario * MaterialesProductos[i].cantidad)
             }
     }
     
     var Suma2Mano= ((suma * MaterialesASumar[a].ManoObMaterial)/100) + suma;
     var Suma3Por= ((Suma2Mano * MaterialesASumar[a].PorcentajeMaterial)/100) +Suma2Mano;
     
     
     var sumaSolventes = 0;
                 
     for (let m=0; m<PinturaProductos.length; m++){
         if (PinturaProductos[m].preciounitario >=0){
     
             sumaSolventes = sumaSolventes + (PinturaProductos[m].preciounitario * PinturaProductos[m].cantidad);
         }
         }
     
     var sumaSolventes2Mano= ((sumaSolventes * MaterialesASumar[a].ManoObPintura)/100) + sumaSolventes;
     var sumaSolventes3Por=((sumaSolventes2Mano * MaterialesASumar[a].PorcentajePintura)/100) +sumaSolventes2Mano;
     
     
         var sumaInsumos = 0;
                 
         for (let n=0; n<InstalacionProductos.length; n++){
     
             if (InstalacionProductos[n].preciounitario >=0){
     
                 sumaInsumos = sumaInsumos + (InstalacionProductos[n].preciounitario * InstalacionProductos[n].cantidad);
             }
     
              }
     
              var sumaInsumos2Mano = ((sumaInsumos * MaterialesASumar[a].ManoObInstalacion)/100) + sumaInsumos;
              var sumaInsumos3Por = ((sumaInsumos * MaterialesASumar[a].PorcentajeInstalacion)/100) + sumaInsumos2Mano;
     
     
              var x = Suma3Por+sumaSolventes3Por+sumaInsumos3Por;
              var SubTotal=Math.round(x)
              console.log(SubTotal)
              await Producto.updateOne({_id:MaterialesASumar[a]._id},{ $set: { precio:SubTotal } });
     
     
     
     
     
             }
     
     
     res.redirect('/materiales');
}

