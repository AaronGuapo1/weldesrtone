
const material = require('../models/materiales.js')
const path = require('path')



module.exports = async (req, res) =>{
    await material.create(req.body) 
    res.redirect('/EdicionMateriales')

    }


