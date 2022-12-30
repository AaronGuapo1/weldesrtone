const material = require('../models/materiales.js');

module.exports = async (req, res) =>{
    const materiales = await material.find({});
    res.render('EdicionMateriales',{materiales});
}
