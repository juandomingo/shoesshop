module.exports = function() {
	var db = require('./../db/MongoDBhandler.js'),
	 	
	 	_notlogedToken = "SADASDar342VCsdfSPOIwr+'05poakfsdpos03#&",
	 	_adminToken = _notlogedToken;


	var editProduct = function(product,token,callback){

		if (token === _adminToken){
			if (product.image !== "")
				{product.image = "images/"+ product.type +"/" + product.image;}
			else
				{delete product.image;}
				db.edit(product, function(result){callback(
				{result : result ,message : "product edited"}
			);});

		}
		else{
			callback({result : "",message : "not authorized"});
		}
	}

	var addProduct = function(product,token,callback){
		if (token === _adminToken){
			product.image = "images/"+ product.type +"/" + product.image;
			delete product._id;
			db.insertProduct(product, function(result){callback(
				{result : result ,message : "product added"}
			);});
		}
		else{
			callback({result : "",message : "not authorized"});
		}
	}


	var getAllProducts = function(callback){
			db.getAllProducts(callback)
	}

	var getBulkProducts = function(callback){
			db.getBulkProducts(callback)
	}

	var getAllProductsTyped = function(productName, callback){
		if (productName == "food"){
			db.getAllProductsTyped("food",callback)
		}
		else{
			db.getAllProductsTyped("fashion",callback);
		}
	}

	var getBulkProductsTyped = function(productName, callback){
		if (productName == "food"){
			db.getBulkProductsTyped("food",callback)
		}
		else{
			db.getBulkProductsTyped("fashion",callback);
		}
	}

  var deleter = function(id, token,callback){
  		console.log(id);
  		if (token === _adminToken){
			db.deleter(id, function(result){callback(
				{result : result ,message : "product deleted"}
			);});
		}
		else{
			callback({result : "",message : "not authorized"});
		}
  };

	var login = function(username,password,callback){
		if ((a = db.login(username,password)) !== false){
			_adminToken = a;
			callback({result : a ,message : "Logged succesfully"});
		}
		else{
			callback({result : false ,message : "Could not login"});
		}
	}

  	var logout = function(token,callback){
		if (token === _adminToken){
			_adminToken = _notlogedToken;
			callback({result : "",message : "you are now logged out"});
		}else{
			callback({result : "",message : "not authorized"});
		}
	}

	var controller = {
      "login" : function(username,password,callback){login(username,password,callback);},
      "addProduct" : function(product,token, callback){addProduct(product,token, callback);},

      "getAllProducts" : function(callback){getAllProducts(callback);},
      "getBulkProducts" : function(callback){getBulkProducts(callback);},

      "getAllProductsTyped" : function(productName, callback){getAllProductsTyped(productName, callback);},
      "getBulkProductsTyped" : function(productName, callback){getBulkProductsTyped(productName, callback);},

      "editProduct" : function(product,token,callback){editProduct(product,token,callback);},
      "deleter" : function(id, token,callback){deleter(id, token,callback);},
  	}

  	return controller;
}();
