const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{
    let role = "viewer";
    let logged = false; 
    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
        logged = true;
    }

    const productoDoc = await Producto.findOne({IdProducto: req.params.idProducto});

    res.render('producto', {roles: role, loggedIn: logged, productoDoc});
}
    