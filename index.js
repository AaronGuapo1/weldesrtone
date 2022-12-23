// ---------------- PACKAGES ---------------- // 
const express = require('express');
const app = new express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

// ---------------- APP CONFIG ---------------- // 
app.use(flash());
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(expressSession({
    secret: 'keyboard cat'
}));
    
// ---------------- SERVER ---------------- // 
const inicioController = require('./controllers/inicio');
const TiendaController = require('./controllers/tienda');
const AboutController = require("./controllers/about"); 
const RegistrarController= require('./controllers/registrarse');
const GuardarUsuario = require('./controllers/GuardarUsuario');
const LoginController = require('./controllers/login');
const LogearseController = require('./controllers/logearse');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const AgregarProductosController = require('./controllers/agregarProductos');
const EditarProductosController = require('./controllers/editarProductos');
const SeguridadMiddleware= require('./middleware/seguridad');
const EdicionMaterialesController = require('./controllers/EdicionMateriales');
const EdicionMaterialesPostController = require('./controllers/EdicionMaterialesPost');
const AgregarMaterialesPostController = require('./controllers/AgregarMaterialPost');
const EliminarMaterialPostPostController = require('./controllers/EliminarMaterialPost');

global.loggedIn = null;
global.roles = null;

app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
roles= req.session.role;
usuario= req.session.username;
next()
});

// ---------------- DATABASE ---------------- // 
 mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://Aaron:tamales@aaronproyecto.sfdk1.mongodb.net/Woolderstone', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});

// ---------------- PAGES ---------------- // 
// - Get Method
app.get('/', inicioController);
app.get('/tienda', TiendaController);
app.get("/about", AboutController);
app.get('/registrarse',redirectIfAuthenticatedMiddleware, RegistrarController);
app.get('/login',redirectIfAuthenticatedMiddleware, LoginController);
app.get('/logout', logoutController);
app.get('/AgregarProductos',SeguridadMiddleware, AgregarProductosController);
app.get('/EditarProductos', SeguridadMiddleware,EditarProductosController);
app.get('/EdicionMateriales', SeguridadMiddleware,EdicionMaterialesController);

// - Post Method
app.post('/logearse', redirectIfAuthenticatedMiddleware,LogearseController);
app.post('/registrar',redirectIfAuthenticatedMiddleware, GuardarUsuario);
app.post('/EdicionMaterialesPost',SeguridadMiddleware, EdicionMaterialesPostController);
app.post('/AgregarMaterialPost',SeguridadMiddleware, AgregarMaterialesPostController);
app.post('/EliminarMaterialPost',SeguridadMiddleware, EliminarMaterialPostPostController);

app.use((req, res) => res.render('notfound'));

app.listen(3000, ()=>{
    console.log('App listening on port 3000')
});

