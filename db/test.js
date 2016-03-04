var db = require('./MongoDBhandler.js');
var shoe = {shoename: "asd"};



var callback = function(data){console.log(data);}
db.insertShoe(shoe, callback);
db.getAllShoes(callback);
