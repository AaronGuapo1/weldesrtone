const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')


const ProductoSchema = new Schema({

_id:{type:String},
materiales:[{nombre:{type:String}}],
precio:{type:Float},
imagen:{},
nombre:{type:String},
descripcion:{type:String},






});

const Producto = mongoose.model('Producto',ProductoSchema);
module.exports = Producto;
