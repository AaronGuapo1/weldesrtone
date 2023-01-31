const Producto = require('../models/Productos.js');
const Cart = require("../models/Cart");
const User = require("../models/User")

module.exports = async (req, res) =>{
    let role = "viewer";
    let logged = false; 
    if(req.session?.passport?.user != undefined){
        role = req.session
        .passport.user.role;
        logged = true;
        var IdUsuario = req.session.passport.user.id;

    }
    var page = req.query.page;
    //console.log(page)
    if (page === undefined && IdUsuario=== undefined ){
    const productos = await Producto.paginate({},{page:1,limit:30});
    const cart = await Cart.find({});
   

    res.render('tienda',{productos, roles: role, loggedIn: logged,cart});
 
    }else if(page === undefined && IdUsuario != undefined){
        const productos = await Producto.paginate({},{page:1,limit:30});
        const cart = await Cart.find({});
       
    
        res.render('tienda',{productos, roles: role, loggedIn: logged,cart,IdUsuario});
     
    }
    
    
    else if(page != undefined && IdUsuario=== undefined) {
        const productos = await Producto.paginate({},{page,limit:30});
        const cart = await Cart.find({});

        res.render('tienda',{productos, roles: role, loggedIn: logged,cart});
    } else if (page != undefined && IdUsuario != undefined){
        const productos = await Producto.paginate({},{page,limit:30});
        const cart = await Cart.find({});

        res.render('tienda',{productos, roles: role, loggedIn: logged,cart,IdUsuario});
    }
}
    