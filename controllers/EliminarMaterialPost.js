
const material = require('../models/materiales.js')
const path = require('path')



module.exports = async (req, res) =>{
    console.log(req.body);
    await material.deleteOne({DescripcionBusqueda:req.body.DescripcionBusqueda})

    res.redirect('/EdicionMateriales')

    }


