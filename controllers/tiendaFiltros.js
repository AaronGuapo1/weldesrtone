const Producto = require('../models/Productos.js');
const Cart = require("../models/Cart");

module.exports = async (req, res) => {
    let role = "viewer";
    let logged = false; 
    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
        logged = true;
        var IdUsuario = req.session.passport.user.id;
    }

    let filtro = req.params.filtro.replace("-", " ");

    let productos = await Producto.find({familia: filtro});

    const cart = await Cart.find({});

    if(IdUsuario != undefined){
        res.render('tienda',{productos, roles: role, IdUsuario, loggedIn: logged, cart});
    } else {
        res.render('tienda',{productos, roles: role, loggedIn: logged, cart});
    }
};
