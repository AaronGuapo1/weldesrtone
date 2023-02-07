const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')
const mongoosePaginate= require('mongoose-paginate-v2')



const CompraSchema = new Schema({

    ProductosComprados:[{nombre:{type:String},precio:{type:Number},cantidad:{type:Number},image:{type:String}}],
    PrecioTotal:{type:Number},
    DireccionEnvio:{type:String},
    Nombre_comprador:{type:String},
    Apellidos_comprador:{type:String},
    Id_usuario:{type:String},
    //paypal
    Id_transaccion:{type:String},
    Fecha_compra:{type:String},
    Correo_comprador:{type:String},    
    Pais_comprador:{type:String},
    Id_comprador:{type:String},
    status:{type:String},
    

});


CompraSchema.plugin(mongoosePaginate);
const Compra = mongoose.model('Compra',CompraSchema);
module.exports = Compra;
