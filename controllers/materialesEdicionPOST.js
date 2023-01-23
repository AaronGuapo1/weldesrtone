const material = require('../models/materiales.js');
const Producto = require('../models/Productos.js');
const path = require('path');


module.exports = async (req,res)=>{        
    const obj_ids = req.body.id;
    //console.log(req.body);


    if(obj_ids != undefined ){
        if(typeof obj_ids != "string"){
            for (let i = 0; i < obj_ids.length; i++) {
    
                const params = {};
    
                if(req.body.Codigo[i] != ""){
                    params.Codigo = req.body.Codigo[i];
                }
    
                if(req.body.Unidad[i] != ""){
                    params.Unidad = req.body.Unidad[i];
                }
    
                if(req.body.PrecioUnitario[i] != ""){
                    params.PrecioUnitario = parseFloat(req.body.PrecioUnitario[i]);
                }
    
                if(req.body.Familia[i] != ""){
                    params.Familia = req.body.Familia[i];
                }
    
                if(req.body.SubFam[i] != ""){
                    params.SubFam = req.body.SubFam[i];
                }
    
                //console.log(params);
    
                await material.findByIdAndUpdate(obj_ids[i], params);
            }
        } else{
            const params = {}
    
            if(req.body.Codigo != ""){
                params.Codigo = req.body.Codigo;
            }
    
            if(req.body.Unidad != ""){
                params.Unidad = req.body.Unidad;
            }
    
            if(req.body.PrecioUnitario != ""){
                params.PrecioUnitario = parseFloat(req.body.PrecioUnitario);
            }
    
            if(req.body.Familia != ""){
                params.Familia = req.body.Familia;
            }
    
            if(req.body.SubFam != ""){
                params.SubFam = req.body.SubFam;
            }

            if(params != {}){
                await material.findByIdAndUpdate(obj_ids, params);
            }
        }
    }

const mateprod= await material.find({});
const cantidadrespetada = await Producto.find({});
for (let i=0; i<cantidadrespetada.length; i++){
for (let a=0; a<mateprod.length; a++){


await Producto.updateOne({_id:cantidadrespetada[i]._id}, { $set: {"MaterialesProductos.$[item]":{Descripcion:mateprod[a].Descripcion,cantidad:cantidadrespetada[i].MaterialesProductos[a].cantidad,codigo:mateprod[a].Codigo,familia:mateprod[a].Familia,preciounitario:mateprod[a].PrecioUnitario}}},{arrayFilters: [{"item._id":cantidadrespetada[i].MaterialesProductos[a]._id}]});
await Producto.updateOne({_id:cantidadrespetada[i]._id}, { $set: {"PinturaProductos.$[item]":{Descripcion:mateprod[a].Descripcion,cantidad:cantidadrespetada[i].PinturaProductos[a].cantidad,codigo:mateprod[a].Codigo,familia:mateprod[a].Familia,preciounitario:mateprod[a].PrecioUnitario}}},{arrayFilters: [{"item._id":cantidadrespetada[i].PinturaProductos[a]._id}]});
await Producto.updateOne({_id:cantidadrespetada[i]._id}, { $set: {"InstalacionProductos.$[item]":{Descripcion:mateprod[a].Descripcion,cantidad:cantidadrespetada[i].InstalacionProductos[a].cantidad,codigo:mateprod[a].Codigo,familia:mateprod[a].Familia,preciounitario:mateprod[a].PrecioUnitario}}},{arrayFilters: [{"item._id":cantidadrespetada[i].InstalacionProductos[a]._id}]});



}
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








    res.redirect("/materiales")
}






/*







*/