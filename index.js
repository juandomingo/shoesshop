var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var controller = require('./controller/controller.js');
var mongoose =require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.json({ extended: true }));
app.use('/css',express.static(__dirname +'/app/css'));
app.use('/css/images',express.static(__dirname +'/app/css/images'));
app.use('/vendor',express.static(__dirname +'/app/vendor'));
app.use('/js',express.static(__dirname +'/app/js'));
app.use('/data',express.static(__dirname +'/app/data'));
app.use('/images',express.static(__dirname +'/app/images'));
app.use('/build',express.static(__dirname +'/app/build'));

var fs = require('fs');
var siofu = require("socketio-file-upload");
app.use(siofu.router);

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

/*
  SOCKET IO
*/

var handleClient = function(socket){

    var _defaultdir = "./app/images/";
    var uploader = new siofu();
    uploader.listen(socket);
    uploader.on("start",function(event){
    var dir = _defaultdir + event.file.meta.product.product.type;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
      uploader.dir = dir;
    });
    
    uploader.on("saved",function(event){
      console.log(event.file.meta.product.product._id);
      if (event.file.meta.product.product._id !== ""){
        controller.editProduct(event.file.meta.product.product,event.file.meta.product.token, send("editProductR"));
      }
      else{
        controller.addProduct(event.file.meta.product.product,event.file.meta.product.token, send("addProductR"));
      }
    });


  var send = function(socketName){return function(data){socket.emit(socketName, data);};}

  var login = function(data){
    controller.login(data.username, data.password, send("loginR"));
  };

  var addProduct = function(data){
    controller.addProduct(data.product,data.token, send("addProductR"));
  };

  var getBulkProductsTyped = function(type){
    controller.getBulkProductsTyped(type,send("getBulkProductsR"));
  };

  var getBulkProducts = function(){
    controller.getBulkProducts(send("getBulkProductsR"));
  };

  var getAllProductsTyped = function(type){
    controller.getAllProductsTyped(type,send("getAllProductsR"));
  };

  var getAllProducts = function(){
    controller.getAllProducts(send("getAllProductsR"));
  };


  var editProduct = function(data){
    controller.editProduct(data.product,data.token,send("editProductR"));
  };

  var deleter = function(data){
    controller.deleter(data._id, data.token,send("deleterR"));
  };

  socket.on('editProduct', editProduct)
  socket.on('login', login);
  socket.on('addProduct', addProduct);
  socket.on('getBulkProductsTyped', getBulkProductsTyped);
  socket.on('getBulkProducts', getBulkProducts);
  socket.on('getAllProductsTyped', getBulkProductsTyped);
  socket.on('getAllProducts', getBulkProducts);
  socket.on('delete', deleter);
}
io.sockets.on('connection', handleClient);


server.listen(80, function(){
  console.log("Listen on port 80\n");
});
