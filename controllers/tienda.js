const Producto = require('../models/Productos.js');

module.exports = async (req, res) =>{
    let role = "viewer";
    let logged = false; 
    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
        logged = true;
    }
    var page = req.query.page;
       
    //console.log(page)
    if (page === undefined){
    const productos = await Producto.paginate({},{page:1},{limit:10},);

    res.render('tienda',{productos, roles: role, loggedIn: logged});
    }else {
        const productos = await Producto.paginate({},{page},{limit:10},);

        res.render('tienda',{productos, roles: role, loggedIn: logged});
    }
}
    