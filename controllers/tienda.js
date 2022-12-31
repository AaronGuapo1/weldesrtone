const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{
    let role = "viewer";
    let logged = false; 
    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
        logged = true;
    }
    
    const productos = await Producto.find({});

    res.render('tienda',{productos, roles: role, loggedIn: logged});
}
    