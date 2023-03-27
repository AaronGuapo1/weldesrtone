const material = require("../models/materiales.js");


module.exports = async (req, res) =>{
    var porcentaje= (req.body.porcentaje/100)+1

    var porcentajeRed= 1-(req.body.porcentaje/100)



if(req.body.porcentaje >0 && req.body.accion ==='incrementar'){

    await material.updateMany({Familia:req.body.FamiliaPrecio }, { $mul: { PrecioUnitario: porcentaje }});



}else if (req.body.porcentaje >0 && req.body.accion ==='reducir')
{

    await material.update({Familia:req.body.FamiliaPrecio},{$mul:{PrecioUnitario:porcentajeRed}})

}




res.redirect('/materiales/true')
}

