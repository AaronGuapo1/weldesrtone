// ---------------- PACKAGES ---------------- // 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require("./models/User.js")
const cors = require('cors');
const request = require('request');
const mercadopago = require("mercadopago");
const años = require('./controllers/años')



// -------------- MIDDLEWARE -------------- //
function nocache(req, res, next) { /// function used to remove cache anywhere needed
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

// ---------------- APP CONFIG ---------------- // 
const app = new express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 
app.use(fileUpload());
app.use(cors());
app.set("view engine", "ejs");
//app.use(expressLayouts)

// -------------- SESSION CONFIG -------------- //
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// -------------- PASSPORT CONFIG -------------- //
passport.use(User.createStrategy());
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        role: user.role,
        picture: user.picture
      });
    });
});  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

// - Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/welderstone"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, async function (err, user) {
      if(user?.role == undefined){
        await User.updateMany({googleId: user.googleId}, {username: profile.displayName, role: "costumer"});
      }

      return cb(err, user);
    });
  }
));

// - Facebook OAuth
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/welderstone"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, async function (err, user) {
    if(user?.role == undefined){
      await User.updateMany({facebookId: profile.id}, {username: profile.displayName, role: "costumer"});
    }

    return cb(err, user);
  });
}
));

// - Microsoft OAuth
passport.use(new MicrosoftStrategy({
  // Standard OAuth2 options
  clientID: process.env.MICROSOFT_APP_ID,
  clientSecret: process.env.MICROSOFT_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/microsoft/welderstone",
  scope: ['user.read'],

  // Microsoft specific options

  // [Optional] The tenant for the application. Defaults to 'common'. 
  // Used to construct the authorizationURL and tokenURL
  tenant: 'common',

  // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
  authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',

  // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
  tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ microsftId: profile.id }, async function (err, user) {
    if(user?.role == undefined){
      await User.updateMany({microsftId: profile.id}, {username: profile.displayName, role: "costumer"});
    }

    return done(err, user);
  });
}
));

// ---------------- DATABASE ---------------- // 
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://Aaron:tamales@aaronproyecto.sfdk1.mongodb.net/Woolderstone', {useNewUrlParser: true});
//  mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});
mongoose.connect("mongodb://0.0.0.0:27017/welderstoneDB");

// ---------------- CONTROLLERS ---------------- //
const CLIENT ='AUJPP79ZQrRGOOcfqTUUrSb5W1_7mKl_ZS6cytwOYxbgy313Y6gOqdzeB_zcd_39q6ToD9NrLHm1Vga3';
const SECRET = 'ELwDrZw6HUnHgle6kfri5qG9RBuLnbCWpYz2zWhqtCidQvhq8HgQmJT1c5Qut1TijbgHxWaTi_c31YMr';
const PAYPAL_API= 'https://api-m.sandbox.paypal.com'; //https://api-m.paypal.com
const auth ={ user: CLIENT, pass: SECRET}

const inicioController = require('./controllers/inicio');
const tiendaController = require('./controllers/tienda');
const loginController = require('./controllers/login');
const logoutController = require('./controllers/logout');
const productosGET = require('./controllers/productosGET');
const materialesGET = require('./controllers/materialesGET');
const materialesEdicionPOST = require('./controllers/materialesEdicionPOST');
const materialesAgregarPOST = require('./controllers/materialesAgregarPOST');
const materialesBusqueda = require("./controllers/materialesBusqueda");
const productosEdicionPOST = require("./controllers/productosEdicionPOST");
const productosAgregarPOST = require('./controllers/productosAgregarPOST');
const productosEdicionMaterialesPOST = require('./controllers/productosEdicionMateriales');
const materialBorrar = require('./controllers/materialBorrar');
const aboutGET = require("./controllers/about");
const productoGET = require("./controllers/productoGET")
const productoBorrar= require('./controllers/productoBorrar');
const productosEMPOST = require('./controllers/productosEMPost')
const getProducts = require('./controllers/GetProducts')
const getProductsCart = require('./controllers/GetProductsCart')
const addProductCart = require('./controllers/AddProductCart')
const putProduct = require('./controllers/PutProduct')
const cart = require('./controllers/cart')
const url = require('url');
const HistorialCompras = require('./controllers/HistorialCompras');
const factura = require ('./controllers/factura');
const FiltrosCompras = require('./controllers/FiltrosCompras');
const pdfDescargar = require('./controllers/descargar');
const productoEditarGet = require("./controllers/productoEditarGET");
const FiltrosCompras2 = require('./controllers/FiltrosCompras2');


// MercadoPago

mercadopago.configure({
  access_token: "APP_USR-3363834709709437-021123-c67d96e1feb214bee0c7a3da3817a59f-1307218136",
});
//TEST-3839284531017998-020712-ac9e468d300f8fc099e58dfb6672b92b-1050032368
app.post("/create_preference", async (req, res) => {

 console.log(req.body)
  var compras = []
  var suma = 0;
  for (i=1; i<req.body.precio.length; i++){
    compras.push({tittle: req.body.nombre[i], unit_price: Number(req.body.precio[i]),quantity: Number(req.body.amount[i])})
    suma = suma + (req.body.amount[i]*req.body.precio[i])

  }

	let preference = {
		items:compras,
    
		back_urls: {
			"success": "http://localhost:3000/feedback",
			"failure": "http://localhost:3000/feedback",
			"pending": "http://localhost:3000/feedback"
		},
		auto_return: "approved",
    //notification_url: 'http://localhost:3000/feedback' //Por ahora tendrá que ser local, una vez levantado el servidor /feedback al final del URL
	};


  mercadopago.preferences.create(preference)
  .then(async function(response){


    const Compra = require("./models/compra");
    const IdUsuario = req.session.passport.user.id;
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    await Compra.create({PrecioTotal:suma,Id_usuario:IdUsuario,Id_transaccion:response.body.id,Fecha_compra:date})
    for (a=1; a<req.body.precio.length;a++){
    await Compra.updateOne({Id_usuario:IdUsuario,Id_transaccion:response.body.id}, { $push: {ProductosComprados: { nombre:req.body.nombre[a],precio:req.body.precio[a],cantidad:req.body.amount[a],image:req.body.image[a]}}});
  }

    res.render('mercado', {response,preference});
  }).catch(function(error){
    console.log(error);
  });




});


app.get('/feedback', async function(request, response) {
  
  const Compra = require("./models/compra");
  const Cart = require("./models/Cart");
  const IdUsuario = request.session.passport.user.id;

    await Compra.updateOne({Id_transaccion:request.query.preference_id}, {$set:{Id_pago:request.query.payment_id,Orden_mercancia:request.query.merchant_order_id,Nombre_comprador:request.user.username,status:request.query.status}})
    await Cart.deleteMany({UsuarioId:IdUsuario});
    response.redirect('/');
});

app.use('/notificar',(req,res)=>{
console.log("notificar")
});




const tiendaBusqueda = require("./controllers/tiendaBusqueda");
const tiendaFiltros = require("./controllers/tiendaFiltros");

// - Paypal
const createPayment = (req,res)=>{
    var suma = 0;

    for (var i=1; i<req.body.precio.length; i++){
        suma = suma + (req.body.amount[i]*req.body.precio[i])
    }

    const body = {
        intent: 'CAPTURE',
        purchase_units:[{
            amount: {
                currency_code: 'MXN', //https://developer.paypal.com/reference/currency-codes/
                value: suma //costo del producto
            }
        }],
        application_context: {
            brand_name:'EmpresaNombre.com' ,
            landing_page: 'NO_PREFERENCE',
            user_action:'PAY_NOW',
            return_url:`http://localhost:3000/execute-payment`,
            cancel_url:`http://localhost:3000/cancel-payment`
        }
    }

    request.post(`${PAYPAL_API}/v2/checkout/orders`,{
        auth,
        body,
        json:true
    }, async (err,response) =>  {
        const datos = ({data:response.body})
        var {data} = datos
        const pago = data.links[1].href

        const Compra = require("./models/compra");
        const IdUsuario = req.session.passport.user.id;
       
        await Compra.create({PrecioTotal:suma,Id_usuario:IdUsuario,Id_transaccion:data.id})
        for (a=1; a<req.body.precio.length;a++){
        await Compra.updateOne({Id_usuario:IdUsuario,Id_transaccion:data.id}, { $push: {ProductosComprados: { nombre:req.body.nombre[a],precio:req.body.precio[a],cantidad:req.body.amount[a],image:req.body.image[a]}}});
  }



       res.redirect(pago);
    })
}
const executePayment =  (req,res)=>{
  const Compra = require("./models/compra");
  const Cart = require("./models/Cart");
  const IdUsuario = req.session.passport.user.id;

  console.log(req.query)
    const token = req.query.token;
    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,{
    auth,
    body:{},
    json:true
    }, async (err,response)  =>  {
    //res.json({data:response.body})
    console.log({data:response.body})
    var datos = {data:response.body}
    var {data} = datos
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    await Compra.updateOne({Id_transaccion:data.id}, {$set:{Correo_comprador:data.payer.email_address,Pais_comprador:data.payer.address.country_code,Id_comprador:data.payer.payer_id,Nombre_comprador:data.payer.name.given_name,Apellidos_comprador:data.payer.name.surname,status:data.status,Fecha_compra:date}})
    await Cart.deleteMany({UsuarioId:IdUsuario});
    res.render('pagado', {data})
    

    })
}

const cancelPayment =(req,res)=>{
  //borrar colección
    res.redirect('/cart')
}




// ---------------- SERVER ---------------- // 
// - GET METHOD - //
app.get('/', inicioController);
app.get('/tienda', tiendaController);
app.get("/about", aboutGET);
app.get('/login/:status', loginController);
app.get('/logout', logoutController);
app.get('/productos', nocache, productosGET);
app.get("/productos/:idProducto", productoGET)
app.get('/materiales/:status', nocache, materialesGET);
app.get("/tienda/busqueda/:filtro", tiendaFiltros);
app.get("/productos/editar/:Id", nocache, productoEditarGet);

// - Google Auth
app.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));
app.get("/auth/google/welderstone", passport.authenticate("google", {failureRedirect: "/login/false"}), function(req, res){
    res.redirect("/")
});

// - Facebook Auth
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/welderstone', passport.authenticate('facebook', { failureRedirect: '/login/false' }), function(req, res) {
    res.redirect('/');
});

// - Microsoft Auth
app.get('/auth/microsoft',
passport.authenticate('microsoft', {
  prompt: 'select_account',
}));
app.get('/auth/microsoft/welderstone', 
passport.authenticate('microsoft', { failureRedirect: '/login/false' }),
function(req, res) {
    res.redirect('/');
});

//PDF
app.use('/pdfDescargar', pdfDescargar )


// - POST METHOD - //
// - Materiales
app.post('/materiales/edicion', materialesEdicionPOST);
app.post('/materiales/agregar', materialesAgregarPOST);
app.post("/materiales/busqueda", materialesBusqueda);
app.use('/material/borrar/:id', materialBorrar);

// - Productos
app.post("/productos/edicion", productosEdicionPOST);
app.post('/productos/agregar', productosAgregarPOST);
app.post('/productos/EditarMateriales', productosEMPOST);
app.get('/productos/MaterialesEdicion/:id',productosEdicionMaterialesPOST );
app.use('/productos/borrar/:id', productoBorrar);

// - Tienda
app.post("/tienda/busqueda", tiendaBusqueda);

//carrito
app.get("/products", getProducts);
app.get("/cart", cart);
app.get("/products-cart", getProductsCart);
app.post("/products-cart", addProductCart);
app.use("/products-cart/:productId", putProduct);

//paypal
app.post(`/create-payment`, createPayment)
app.get(`/execute-payment`, executePayment)
app.get('/cancel-payment', cancelPayment)

//compras
app.get('/HistorialCompras', HistorialCompras )
app.get('/factura', factura)
app.use('/FiltrosCompras',FiltrosCompras)
app.use('/FiltrosCompras2',FiltrosCompras2)


app.use((req, res) => res.render('notfound'));

app.listen(3000, ()=>{
    console.log('App listening on port 3000');
})

