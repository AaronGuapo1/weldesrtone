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

        for(i=0; i<producto[0].MaterialesProductos.length; i++){

           for(j=0; j<materiales.length; j++){
                if(producto[0].MaterialesProductos[i].Descripcion ===materiales[j].Descripcion){

                    producto[0].MaterialesProductos[i].preciounitario =materiales[j].PrecioUnitario
            

    }
}
}

for(i=0; i<producto[0].PinturaProductos.length; i++){

    for(j=0; j<materiales.length; j++){
         if(producto[0].PinturaProductos[i].Descripcion ===materiales[j].Descripcion){

             producto[0].PinturaProductos[i].preciounitario =materiales[j].PrecioUnitario
     

}
}
}

for(i=0; i<producto[0].InstalacionProductos.length; i++){

    for(j=0; j<materiales.length; j++){
         if(producto[0].InstalacionProductos[i].Descripcion ===materiales[j].Descripcion){

             producto[0].InstalacionProductos[i].preciounitario =materiales[j].PrecioUnitario
     

}
}
}




        res.render('productoEditar', {productoEditar: producto[0], materiales, roles: role, loggedIn: true});
    } else{
        res.redirect("/")
    }
}

/*



*/