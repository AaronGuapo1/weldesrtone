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





res.redirect('/productos');

}
    


