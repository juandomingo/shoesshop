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

/*
  SOCKET IO
*/

var handleClient = function(socket){

  var send = function(data,socketName){socket.emit(socketName, data);}

  var A = function(data){
    controller.getA(data, send);
  }

  socket.on('A', A);

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


server.listen(3000, function(){
  console.log("Listen on port 3000\n");
});
