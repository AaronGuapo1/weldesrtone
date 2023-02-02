const Producto = require('../models/Productos.js');
const path = require('path');
const Material = require('../models/materiales.js');

module.exports = async (req,res)=>{   



const BusquedaNombre = await Producto
        .find({ nombre: req.body.nombre })
        .count();
    if (BusquedaNombre === 0) {
   
    await Producto.create({...req.body});
  


        for (a=0; a<req.body['MaterialesProductos[cantidad]'].length;a++){
                await Producto.updateOne({nombre:req.body.nombre}, { $push: {MaterialesProductos: { Descripcion:req.body['MaterialesProductos[nombre]'][a],cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a],preciounitario:req.body['MaterialesProductos[PrecioUnitario]'][a],familia:req.body['MaterialesProductos[Familia]'][a]}}});
                
        }

        for (b=0; b<req.body['PinturaProductos[cantidad]'].length;b++){
            await Producto.updateOne({nombre:req.body.nombre}, { $push: {PinturaProductos: { Descripcion:req.body['PinturaProductos[nombre]'][b],cantidad:req.body['PinturaProductos[cantidad]'][b],codigo:req.body['PinturaProductos[codigo]'][b],preciounitario:req.body['PinturaProductos[PrecioUnitario]'][b],familia:req.body['PinturaProductos[Familia]'][b]}}});
            
    }

    for (c=0; c<req.body['InstalacionProductos[cantidad]'].length;c++){
        await Producto.updateOne({nombre:req.body.nombre}, { $push: {InstalacionProductos: { Descripcion:req.body['InstalacionProductos[nombre]'][c],cantidad:req.body['InstalacionProductos[cantidad]'][c],codigo:req.body['InstalacionProductos[codigo]'][c],preciounitario:req.body['InstalacionProductos[PrecioUnitario]'][c],familia:req.body['InstalacionProductos[Familia]'][c]}}});
        
}

//Obtiene el precio

const productos = await Producto.find({nombre:req.body.nombre});
const materiales = await Material.find({});


const {MaterialesProductos} = productos[0];
const {PinturaProductos} = productos[0];
const {InstalacionProductos} = productos[0];


var suma = 0;

for (let i=0; i<MaterialesProductos.length; i++){
        if (MaterialesProductos[i].Descripcion === materiales[i].Descripcion && materiales[i].PrecioUnitario >= 0 ){
         suma = suma + (MaterialesProductos[i].cantidad *  materiales[i].PrecioUnitario)
        }
}
var Suma2Mano= ((suma * productos[0].ManoObMaterial)/100) + suma;
var Suma3Por= ((Suma2Mano * productos[0].PorcentajeMaterial)/100) +Suma2Mano;

var sumaSolventes = 0;

for (let i=0; i<PinturaProductos.length; i++){
        if (PinturaProductos[i].Descripcion === materiales[i].Descripcion && materiales[i].PrecioUnitario >= 0 ){
            sumaSolventes = sumaSolventes + (PinturaProductos[i].cantidad *  materiales[i].PrecioUnitario)
        }
}
var sumaSolventes2Mano= ((sumaSolventes * productos[0].ManoObPintura)/100) + sumaSolventes;
var sumaSolventes3Por=((sumaSolventes2Mano * productos[0].PorcentajePintura)/100) +sumaSolventes2Mano;

var sumaInsumos = 0;

for (let i=0; i<InstalacionProductos.length; i++){
    if (InstalacionProductos[i].Descripcion === materiales[i].Descripcion && materiales[i].PrecioUnitario >= 0 ){
        sumaInsumos = sumaInsumos + (InstalacionProductos[i].cantidad *  materiales[i].PrecioUnitario)
    }
}
var sumaInsumos2Mano = ((sumaInsumos * productos[0].ManoObInstalacion)/100) + sumaInsumos;
var sumaInsumos3Por = ((sumaInsumos * productos[0].PorcentajeInstalacion)/100) + sumaInsumos2Mano;

var x = Suma3Por+sumaSolventes3Por+sumaInsumos3Por;
var SubTotal=Math.round(x)
console.log(SubTotal)

await Producto.updateOne({nombre:req.body.nombre},{ $set: { precio:SubTotal } });


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
            else if (BusquedaNombre > 0){
                console.log("ya creado")
                res.redirect('/productos')
        
            }
   
}
    

