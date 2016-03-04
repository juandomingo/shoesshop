module.exports = function() {

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


	var getAllShoesF = function(db, callback){
		var cursor =db.collection('shoe').find();
   		cursor.each(function(err, doc) {

	      	assert.equal(err, null);
	      	if (doc !== null) {
	        	callback(doc);
	      	} else {
	        	db.close();
	      	}

   		});

	};
	var getAllShoes = function(callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		getAllShoesF(db, function(doc) {
				db.close();
	      		callback(doc);
	  		});
		});
	};


	var insertShoeF = function(shoe, db, callback) {
   		db.collection('shoe').insertOne( shoe, function(err, result) {
		    assert.equal(err, null);
		    //console.log("Inserted a document into the restaurants collection.");
		    callback(true);
  		});
	};
	var insertShoe = function(shoe,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		insertShoeF(shoe,db, function(result) {
	      		db.close();
	      		callback(result);
	  		});
		});
	};

	var login = function(username,password){
		if (username === "adminshoes" && password === "555556") {
			return "lsig895389U#)43OIodnfosaI2430#$%#6";
		}
		else{
			return false;
		}
	};


	var mongodbhandler = {
      "getAllShoes" : function(callback){getAllShoes(callback)},
      "insertShoe" : function(data, callback){insertShoe(data, callback)},
      "login" : function(username,password){return login(username,password);}
  	}

  	return mongodbhandler;
		

}();
