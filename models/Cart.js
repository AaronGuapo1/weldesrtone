const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')



const CartSchema = new Schema({
_id:{type:String,required:true,unique:true},
nombre:{type:String,required:true,unique:true},
image:{type:String,required:false},
amount:{type:Number,required:true},
precio:{type:Number,required:true},
UsuarioId:{type:String,required:true}


});

const Cart = mongoose.model('Cart',CartSchema);
module.exports = Cart;
