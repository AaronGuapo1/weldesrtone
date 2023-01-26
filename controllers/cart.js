const Producto = require('../models/Productos.js');
const Cart = require("../models/Cart");

module.exports = async (req, res) =>{
    let role = "viewer";
    let logged = false; 
    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
        logged = true;
    }
    const productos = await Producto.find({});
    const cart = await Cart.find({});
    res.render('cart',{productos,cart,roles: role, loggedIn: logged});
    }
    