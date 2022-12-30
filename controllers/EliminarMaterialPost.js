
const material = require('../models/materiales.js');
const path = require('path');
var express = require ('express');
var router =express.Router();

module.exports = async (req, res) =>{
    await material.deleteOne({DescripcionBusqueda:req.body.DescripcionBusqueda});

    res.redirect('/EdicionMateriales');
}

module.exports = router;