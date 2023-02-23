const Producto = require('../models/Productos.js');
const Material = require('../models/materiales.js');

module.exports = async (req, res) =>{
    let role = "viewer";

    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
    }

    if(role == "admin"){       
        const materiales = await Material.find({});

        const producto = await Producto.find({_id: req.params.Id});

        res.render('productoEditar', {productoEditar: producto[0], materiales, roles: role, loggedIn: true});
    } else{
        res.redirect("/")
    }
}