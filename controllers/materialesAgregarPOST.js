
const material = require('../models/materiales.js');

module.exports = async (req, res) =>{
    await material.create(req.body);
    res.redirect('/materiales');
}


