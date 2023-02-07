const Compra = require("../models/compra");
const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{
    let role = "viewer";
    var page = req.query.page;

    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
       const IdUsuario = req.session.passport.user.id;
       if (page === undefined  ){
       const compra = await Compra.paginate({},{page:1,limit:30})
    res.render('HistorialCompras',{IdUsuario, compra, roles: role,loggedIn: true})
       }else if(page != undefined){
        const compra = await Compra.paginate({},{page,limit:30})
        res.render('HistorialCompras',{IdUsuario, compra, roles: role,loggedIn: true})

       }
}
}