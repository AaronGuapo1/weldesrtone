const Producto = require('../models/Productos.js');
const Material = require('../models/materiales.js');

module.exports = async (req, res) =>{
    let role = "viewer";

    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
    }
    if(role == "admin"){

        var page = req.query.page;
       
        //console.log(page)
        if (page === undefined){

        const materiales = await Material.find({});
        const productos = await Producto.paginate({},{page:1,limit:10});
        //console.log(productos)
        res.render('productos', {productos, materiales, roles: role, loggedIn: true});
        }else{
            const materiales = await Material.find({});
        const productos = await Producto.paginate({},{page,limit:10});
        //console.log(productos)
        res.render('productos', {productos, materiales, roles: role, loggedIn: true});
        }
    } else{
        res.redirect("/")
    }
}
