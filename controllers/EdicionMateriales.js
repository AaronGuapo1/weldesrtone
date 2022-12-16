const material = require('../models/materiales.js')

module.exports = async (req, res) =>{
    const materiales = await material.find({})
    //console.log(materiales)
    res.render('EdicionMateriales',{materiales})
    }
