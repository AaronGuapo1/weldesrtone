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
const cors = require('cors')
const request = require('request');

// -------------- MIDDLEWARE -------------- //
function nocache(req, res, next) { /// function used to remove cache anywhere needed
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

// ---------------- APP CONFIG ---------------- // 
const app = new express();
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 
app.use(fileUpload());
app.set("view engine", "ejs");

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
      await User.updateMany({facebookId: profile.id}, {username: profile.displayName, role: "costumer"});
    }
    return done(err, user);
  });
}
));

// ---------------- DATABASE ---------------- // 
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://Aaron:tamales@aaronproyecto.sfdk1.mongodb.net/Woolderstone', {useNewUrlParser: true});
  // mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});
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
const pagado = require('./controllers/pagado')

// - Paypal
const createPayment =(req,res)=>{
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
    }, (err,response)=>{
        const datos = ({data:response.body})
        var {data} = datos
        const pago = data.links[1].href
        res.redirect(pago);
    })
}

const executePayment = (req,res)=>{
    const token = req.query.token;

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,{
    auth,
    body:{},
    json:true
    }, (err,response)=>{
    //res.json({data:response.body})
    res.redirect('/pagado')
    })
}

const cancelPayment =(req,res)=>{
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
app.get("/producto", productoGET)
app.get('/materiales', nocache, materialesGET);
// - Google Auth
app.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));
app.get("/auth/google/welderstone", passport.authenticate("google", {failureRedirect: "/login/false"}), function(req, res){
    console.log(req.session);
    res.redirect("/")
});
// - Facebook Auth
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/welderstone', passport.authenticate('facebook', { failureRedirect: '/login/false' }), function(req, res) {
    console.log(req.session);
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
app.get('/pagado', pagado)

app.use((req, res) => res.render('notfound'));

app.listen(3000, ()=>{
    console.log('App listening on port 3000');
})


    