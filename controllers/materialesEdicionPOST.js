const material = require('../models/materiales.js');


module.exports = async (req,res)=>{        
    const obj_ids = req.body.id;
    console.log(req.body);


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
    
                console.log(params);
    
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



//await Producto.updateOne({nombre:req.body.ProductoAEditar}, { $set: {"MaterialesProductos.$[item]":{Descripcion:req.body['MaterialesProductos[nombre]'][a],cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a],familia:req.body['MaterialesProductos[familia]'][a],preciounitario:req.body['MaterialesProductos[preciounitario]'][a]}}}, {arrayFilters: [{"item.codigo":req.body['MaterialesProductos[codigo]'][a]}]});




    res.redirect("/materiales")
}



//await Producto.updateOne({nombre:req.body.ProductoAEditar}, { $set: {"MaterialesProductos.$[item]":{Descripcion:req.body['MaterialesProductos[nombre]'][a],cantidad:req.body['MaterialesProductos[cantidad]'][a],codigo:req.body['MaterialesProductos[codigo]'][a],familia:req.body['MaterialesProductos[familia]'][a],preciounitario:req.body['MaterialesProductos[preciounitario]'][a]}}}, {arrayFilters: [{"item.codigo":req.body['MaterialesProductos[codigo]'][a]}]});
