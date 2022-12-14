const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')
const mongoosePaginate= require('mongoose-paginate-v2')


const ProductoSchema = new Schema({

IdProducto:{type:String},
MaterialesProductos:[{nombre:{type:String},cantidad:{type:Number},codigo:{type:String}}],
precio:{type:Number},
image:{type:String},
nombre:{type:String},
descripcion:{type:String},






});

ProductoSchema.plugin(mongoosePaginate);
const Producto = mongoose.model('Producto',ProductoSchema);
module.exports = Producto;
