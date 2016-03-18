module.exports = function() {

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

	var getBulkShoesF = function(db, callback){
		db.collection('shoe').find().toArray(callback);
	};

	var getBulkShoes = function(callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		getBulkShoesF(db, function(err,items) {


	      		callback([{'products':items}]);
	      						db.close();
	  		});
		});
	};


	var getBulkFoodF = function(db, callback){
		db.collection('food').find().toArray(callback);
	};
	
	var getBulkFood = function(callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		getBulkFoodF(db, function(err,items) {


	      		callback([{'products':items}]);
	      						db.close();
	  		});
		});
	};

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

	var getAllFoodF = function(db, callback){
		var cursor =db.collection('food').find();

   		cursor.each(function(err, doc) {
	      	assert.equal(err, null);
	      	if (doc !== null) {
	        	callback(doc);
	      	} else {
	        	db.close();
	      	}
   		});

	};
	var getAllFood = function(callback){
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


	var editShoeF = function(shoe,db,callback){
		var criteria = {};
		console.log("asdasd" + JSON.stringify(shoe));
		if (shoe.name !== null && shoe.name !== undefined && shoe.name !== "") { criteria["name"] = shoe.name;  };
		if (shoe.description !== null && shoe.description !== undefined && shoe.description !== "") { criteria["description"] = shoe.description;  };
		if (shoe.colorId !== null && shoe.colorId !== undefined && shoe.colorId !== "") { criteria["colorId"] = shoe.colorId;  };
		if (shoe.price !== null && shoe.price !== undefined && shoe.price !== "") { criteria["price"] = shoe.price;  };
		if (shoe.image !== null && shoe.image !== undefined && shoe.image !== "") { criteria["image"] = shoe.image;  };

		console.log(criteria);
		db.collection('shoe').update( { '_id': ObjectId(shoe._id) }, { '$set': criteria}).then(console.log,callback("true;"));

	};

	var editShoe = function(shoe,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		editShoeF(shoe,db, function(result) {
	      		db.close();
	      		callback(result);
	  		});
		});
	};



	var findShoe = function(criteria,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		console.log(criteria);
			db.collection('shoe').find( criteria).toArray( function(err,result) {console.log("resultado" + result);db.close();callback(result);});
		});
	}


	var deleterF = function(id,db,callback){
			db.collection('shoe').remove( { _id : ObjectId(id) } ).then(function(){
				console.log(this);
	      		db.close();
	      		callback(true);
			});
		}

	var deleter = function(id,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		deleterF(id,db, function(result) {
	      		db.close();
	      		callback(result);
	  		});
		});
	};



	var mongodbhandler = {
      "getAllShoes" : function(callback){getAllShoes(callback)},
      "getAllFood" : function(callback){getAllFood(callback)},
      "insertShoe" : function(data, callback){insertShoe(data, callback)},
      "login" : function(username,password){return login(username,password);},
      "getBulkFood"	: function(callback){getBulkFood(callback)},
      "getBulkShoes" : function(callback){getBulkShoes(callback)},
      "edit" : function(shoe,callback){editShoe(shoe,callback);},
      "deleter" : function(id,callback){deleter(id,callback);}
  	}


  	return mongodbhandler;
		

}();
