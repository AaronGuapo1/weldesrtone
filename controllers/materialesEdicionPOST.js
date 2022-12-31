const material = require('../models/materiales.js');

module.exports = async (req,res)=>{
    for (i=1; i<req.body.DescripcionBusqueda.length;i++){
        if(req.body.Descripcion[i] !== '' ){
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Descripcion:req.body.Descripcion[i]}});
        }

        if(req.body.Codigo[i] !== '' ){
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Codigo:req.body.Codigo[i]}});
        }

        if(req.body.Unidad[i] !== ''){
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Unidad:req.body.Unidad[i]}});
        }

        if(req.body.PrecioUnitario[i] !== ''){
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{PrecioUnitario:req.body.PrecioUnitario[i]}});
        }

        if(req.body.Familia[i] !== '' ){
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Familia:req.body.Familia[i]}});
        }

        if(req.body.SubFam[i] !== '' ){
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{SubFam:req.body.SubFam[i]}});
        }
    }

    res.redirect('/materiales')
}

