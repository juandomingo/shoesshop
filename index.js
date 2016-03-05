var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var controller = require('./controller/controller.js');
app.set('view engine', 'jade');
app.use(bodyParser.json({ extended: true }));
app.use('/css',express.static(__dirname +'/app/css'));
app.use('/css/images',express.static(__dirname +'/app/css/images'));
app.use('/vendor',express.static(__dirname +'/app/vendor'));
app.use('/js',express.static(__dirname +'/app/js'));
app.use('/data',express.static(__dirname +'/app/data'));
app.use('/images',express.static(__dirname +'/app/images'));
app.use('/build',express.static(__dirname +'/app/build'));

/*
  SOCKET IO
*/

var handleClient = function(socket){

  var send = function(socketName){return function(data){socket.emit(socketName, data);};}

  var A = function(data){
    controller.getA(data, send);
  }

  var login = function(data){
    controller.login(data.username, data.password, send("loginR"));
  }

  var addshoe = function(data){
    controller.addshoe(data.shoes,data.token, send("addshoeR"));
  }

  var getshoes = function(){
    controller.getshoes(send("getshoesR"));
  }

  var checkout = function(data){
    controller.checkout(data,send("checkoutR"));
  }

  var sociallogin = function(data){
    controller.checkout(data,send("sociallogin"));
  }


  socket.on('sociallogin', sociallogin)
  socket.on('checkout', checkout);
  socket.on('login', login);
  socket.on('addshoe', addshoe);
  socket.on('getshoes', getshoes);
}
io.sockets.on('connection', handleClient);

/*
  WEB APP
*/

app.get('/', function(req, res) {
  res.render('index',{layout:false, message:"hello loquito", title:"Shoes Shop"});
});

app.get('/add', function(req, res) {
  res.render('add',{layout:false, message:"hello loquito", title:"Shoes Shop - add new"});
});


app.post('/checkout', function(req, res){console.log(req.body);})


server.listen(3000, function(){
  console.log("Listen on port 3000\n");
});
