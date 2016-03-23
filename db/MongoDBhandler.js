module.exports = function() {

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

	var getBulkProductsF = function(db, callback){
		db.collection('products').find().toArray(callback);
	};
	
	var getBulkProducts = function(callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		getBulkProductsF(db, function(err,items) {

	      		callback([{'products':items}]);
	      						db.close();
	  		});
		});
	};

	var getAllProductsF = function(db, callback){
		var cursor =db.collection('products').find();

   		cursor.each(function(err, doc) {
	      	assert.equal(err, null);
	      	if (doc !== null) {
	        	callback(doc);
	      	} else {
	        	db.close();
	      	}
   		});
	};

	var getAllProducts = function(callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		getAllProductsF(db, function(doc) {
				db.close();
	      		callback(doc);
	  		});
		});
	};



	var getBulkProductsTypedF = function(type,db, callback){
		db.collection('products').find({type :type}).toArray(callback);
	};
	
	var getBulkProductsTyped = function(type,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		getBulkProductsTypedF(type,db, function(err,items) {


	      		callback([{'products':items}]);
	      						db.close();
	  		});
		});
	};

	var getAllProductsTypedF = function(type,db, callback){
		var cursor =db.collection('products').find({'type': type});

   		cursor.each(function(err, doc) {
	      	assert.equal(err, null);
	      	if (doc !== null) {
	        	callback(doc);
	      	} else {
	        	db.close();
	      	}
   		});
	};

	var getAllProductsTyped = function(type,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		getAllProductsTypedF(type,db, function(doc) {
				db.close();
	      		callback(doc);
	  		});
		});
	};

	var insertProductF = function(product, db, callback) {
   		db.collection("products").insertOne( product, function(err, result) {
		    assert.equal(err, null);
		    //console.log("Inserted a document into the restaurants collection.");
		    callback(true);
  		});
	};

	var insertProduct = function(product,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		insertProductF(product,db, function(result) {
	      		db.close();
	      		callback(result);
	  		});
		});
	};

	var editProductF = function(product,db,callback){
		var criteria = {};
		//console.log("asdasd" + JSON.stringify(product));
		if (product.type !== null && product.type !== undefined && product.type !== "") { criteria["type"] = product.type;  };
		if (product.name !== null && product.name !== undefined && product.name !== "") { criteria["name"] = product.name;  };
		if (product.description !== null && product.description !== undefined && product.description !== "") { criteria["description"] = product.description;  };
		if (product.colorId !== null && product.colorId !== undefined && product.colorId !== "") { criteria["colorId"] = product.colorId;  };
		if (product.price !== null && product.price !== undefined && product.price !== "") { criteria["price"] = product.price;  };
		if (product.image !== null && product.image !== undefined && product.image !== "") { criteria["image"] = product.image;  };
		console.log(criteria);
		db.collection('products').update( { '_id': ObjectId(product._id) }, { '$set': criteria}).then(console.log,callback("true;"));
	};
	var editProduct = function(product,callback){
		MongoClient.connect(url, function(err, db) {
	  		assert.equal(null, err);
	  		editProductF(product,db, function(result) {
	      		db.close();
	      		callback(result);
	  		});
		});
	};


	var deleterF = function(id,db,callback){
			db.collection('products').remove( { _id : ObjectId(id) } ).then(function(){
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

	var login = function(username,password){
		if (username === "admin" && password === "22dos") {
			return "lsig895389U#)43OIodnfosaI2430#$%#6";
		}
		else{
			return false;
		}
	};




	var mongodbhandler = {
      "getProducts" : function(callback){getProducts(callback)},
      "getBulkProducts"	: function(callback){getBulkProducts(callback)},

      'getAllProductsTyped' : function(type,callback){getAllProductsTyped(data, callback)},
      "getBulkProductsTyped"	: function(type,callback){getBulkProductsTyped(type,callback)},

      "insertProduct" : function(data, callback){insertProduct(data, callback)},
      "edit" : function(product,callback){editProduct(product,callback);},
      "deleter" : function(id,callback){deleter(id,callback);},

      "login" : function(username,password){login(username,password);}
  	}


  	return mongodbhandler;
		

}();
