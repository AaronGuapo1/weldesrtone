const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')
const mongoosePaginate= require('mongoose-paginate-v2')



const CompraSchema = new Schema({

    ProductosComprados:[{nombre:{type:String},precio:{type:Number},cantidad:{type:Number},image:{type:String}}], //Ok
    PrecioTotal:{type:Number}, //Ok
    DireccionEnvio:{type:String}, 
    Nombre_comprador:{type:String}, //Ok
    Id_usuario:{type:String}, //Ok
    Correo_comprador:{type:String},    
    //MercadoPAgo
    Id_transaccion:{type:String},  //Ok
    Fecha_compra:{type:String}, //Ok
    Id_pago:{type:String}, //Ok
    Orden_mercancia:{type:String},
    status:{type:String}, //Ok
    

});


CompraSchema.plugin(mongoosePaginate);
const Compra = mongoose.model('Compra',CompraSchema);
module.exports = Compra;







