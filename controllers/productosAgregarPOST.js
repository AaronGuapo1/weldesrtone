const Producto = require('../models/Productos.js');
const path = require('path');

module.exports = async (req,res)=>{   

    await Producto.create({...req.body});

        for (a=0; a<req.body['MaterialesProductos[cantidad]'].length;a++){
                await Producto.updateOne({nombre:req.body.nombre}, { $push: {MaterialesProductos: { nombre:req.body['MaterialesProductos[nombre]'][a],cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a],preciounitario:req.body['MaterialesProductos[PrecioUnitario]'][a],familia:req.body['MaterialesProductos[Familia]'][a]}}});
                
        }

        for (b=0; b<req.body['PinturaProductos[cantidad]'].length;b++){
            await Producto.updateOne({nombre:req.body.nombre}, { $push: {PinturaProductos: { nombre:req.body['PinturaProductos[nombre]'][b],cantidad:req.body['PinturaProductos[cantidad]'][b],codigo:req.body['PinturaProductos[codigo]'][b],preciounitario:req.body['PinturaProductos[PrecioUnitario]'][b],familia:req.body['PinturaProductos[Familia]'][b]}}});
            
    }

    for (c=0; c<req.body['InstalacionProductos[cantidad]'].length;c++){
        await Producto.updateOne({nombre:req.body.nombre}, { $push: {InstalacionProductos: { nombre:req.body['InstalacionProductos[nombre]'][c],cantidad:req.body['InstalacionProductos[cantidad]'][c],codigo:req.body['InstalacionProductos[codigo]'][c],preciounitario:req.body['InstalacionProductos[PrecioUnitario]'][c],familia:req.body['InstalacionProductos[Familia]'][c]}}});
        
}

const MaterialesASumar = await Producto.find({nombre:req.body.nombre})
const {MaterialesProductos} = MaterialesASumar[0];
const {PinturaProductos} = MaterialesASumar[0];
const {InstalacionProductos} = MaterialesASumar[0];



var suma = 0;

for (let i=0; i<MaterialesProductos.length; i++){



         suma = suma + (MaterialesProductos[i].preciounitario * MaterialesProductos[i].cantidad)


}

var Suma2Mano= ((suma * MaterialesASumar[0].ManoObMaterial)/100) + suma;
var Suma3Por= ((Suma2Mano * MaterialesASumar[0].PorcentajeMaterial)/100) +Suma2Mano;


var sumaSolventes = 0;
            
for (let m=0; m<PinturaProductos.length; m++){



        sumaSolventes = sumaSolventes + (PinturaProductos[m].preciounitario * PinturaProductos[m].cantidad);

    
       

    }



var sumaSolventes2Mano= ((sumaSolventes * MaterialesASumar[0].ManoObPintura)/100) + sumaSolventes;
var sumaSolventes3Por=((sumaSolventes2Mano * MaterialesASumar[0].PorcentajePintura)/100) +sumaSolventes2Mano;






    var sumaInsumos = 0;
            
    for (let n=0; n<InstalacionProductos.length; n++){

    
    

            sumaInsumos = sumaInsumos + (InstalacionProductos[n].preciounitario * InstalacionProductos[n].cantidad);

    
             

         }

         var sumaInsumos2Mano = ((sumaInsumos * MaterialesASumar[0].ManoObInstalacion)/100) + sumaInsumos;
         var sumaInsumos3Por = ((sumaInsumos * MaterialesASumar[0].PorcentajeInstalacion)/100) + sumaInsumos2Mano;


         var x = Suma3Por+sumaSolventes3Por+sumaInsumos3Por;
         var SubTotal=Math.round(x)

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
    

