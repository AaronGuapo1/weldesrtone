const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{
    const productos = await Producto.find({});
    res.render('AgregarProductos', {Productos: productos, roles: req.body.passport.user.role, loggedIn: true});
}
