

const material = require('../models/materiales.js')
const path = require('path');



module.exports = async (req, res) =>{
     //codigo
await material.deleteOne({Codigo:req.params.id})
res.redirect('/EdicionMateriales');


    }

   