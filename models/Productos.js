const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')


const ProductoSchema = new Schema({

IdProducto:{type:String},
MaterialesProductos:[{nombre:{type:String},cantidad:{type:Number}}],
precio:{type:Number},
image:{type:String},
nombre:{type:String},
descripcion:{type:String},






});

const Producto = mongoose.model('Producto',ProductoSchema);
module.exports = Producto;
