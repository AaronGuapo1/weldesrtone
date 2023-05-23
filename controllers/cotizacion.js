const Cotizaciones = require("../models/cotizaciones");
const User = require("../models/User")
const pdfDescargar = require('../controllers/descargar')
const PdfPrinter = require("pdfmake")
const fs = require("fs")
const fonts = require("../pdf/fonts")
const styles = require("../pdf/styles")
const Product = require("../models/Productos");
const Material = require('../models/materiales.js');


module.exports = async (req, res) =>{
    const accountSid = process.env.accountSid
    const authToken = process.env.authToken
    
    const client = require('twilio')(accountSid, authToken);


      var Productos =[]

for (let a = 1; a < req.body.precio.length; a++) {
    const productoString = `${a}.- Nombre: ${req.body.nombre[a]} Precio: ${req.body.precio[a]} Cantidad: ${req.body.amount[a]} Unidad: ${req.body.unidad[a]} Código: ${req.body.codigo[a]} IVA: ${req.body.iva[a]} ///`;
    Productos.push(productoString);
  }
  var min = Math.pow(10, 11);  // 10 elevado a la potencia de 11
  var max = Math.pow(10, 12) - 1;  // 10 elevado a la potencia de 12 - 1
  var numero = Math.floor(Math.random() * (max - min + 1)) + min;
    const newId = numero;
    var suma = 0;
    for (i = 1; i < req.body.precio.length; i++) {

        suma = suma + req.body.amount[i] * req.body.precio[i];
    }

    const IdUsuario = req.session.passport.user.id;
    var today = new Date();

    var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();




      client.messages
      .create({
        from: 'whatsapp:+14155238886',
        body: 
        
        `
        Cotización generada, favor de ponerse en contacto con el cliente 
        PrecioTotal: ${suma},
        Id_usuario: ${IdUsuario},
        Fecha_compra: ${date},
        Id_transaccion: ${newId},
        Estado:${req.body.EstadoSelect},
        Telefono:${req.body.Telefono},
        NombreYApellidos:${req.body.NombreYApellidos},
        Direccion:${req.body.Direccion},
        Departamento:${req.body.Departamento},
        Ciudad:${req.body.Ciudad},
        CodigoPostal:${req.body.CodigoPostal},
        Extra:${req.body.Extra},
        Productos Cotizados: ,
        ${Productos}

        
        ` ,
        to: 'whatsapp:+5218715634557',
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.log(error));
//        to: 'whatsapp:+5218715634557',
    await Cotizaciones.create({
        PrecioTotal: suma,
        Id_usuario: IdUsuario,
        Fecha_compra: date,
        Id_transaccion: newId,
        Estado:req.body.EstadoSelect,
        Telefono:req.body.Telefono,
        NombreYApellidos:req.body.NombreYApellidos,
        Direccion:req.body.Direccion,
        Departamento:req.body.Departamento,
        Ciudad:req.body.Ciudad,
        CodigoPostal:req.body.CodigoPostal,
        Extra:req.body.Extra,
    });
    
    await User.updateOne({
        _id: IdUsuario}, {$set:{
        Estado:req.body.EstadoSelect,
        tel:req.body.Telefono,
        fullName:req.body.NombreYApellidos,
        Direccion:req.body.Direccion,
        Departamento:req.body.Departamento,
        Ciudad:req.body.Ciudad,
        Codigo:req.body.CodigoPostal,
        Extra:req.body.Extra,
    }});
    for (a = 1; a < req.body.precio.length; a++) {
        await Cotizaciones.updateOne(
            { Id_usuario: IdUsuario, Id_transaccion: newId },
            {
                $push: {
                    ProductosComprados: {
                        nombre: req.body.nombre[a],
                        precio: req.body.precio[a],
                        cantidad: req.body.amount[a],
                        image: req.body.image[a],
                        unidad: req.body.unidad[a],
                        codigo: req.body.codigo[a],
                        iva: req.body.iva[a],

                    },
                },
            }
        );
    }

//newId

    const cotizaciones = await Cotizaciones.find({Id_transaccion: newId});
    let role = "viewer";
    let logged = false; 
    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
        logged = true;
    }



const NumeroCliente =req.body.Telefono
    res.render('cotizacion',{cotizaciones,roles: role, IdUsuario, loggedIn: logged,NumeroCliente})
 
    }


/* 


*/