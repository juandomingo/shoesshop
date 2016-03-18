module.exports = function() {
	var db = require('./../db/MongoDBhandler.js'),
	 	shoe = {shoename: "asd"},
	 	_notlogedToken = "SADASDar342VCsdfSPOIwr+'05poakfsdpos03#&",
	 	_adminToken = _notlogedToken;

	var getA = function(){//not implemented
	}

	var login = function(username,password,callback){
		if ((a = db.login(username,password)) !== false){
			_adminToken = a;
			callback({result : a ,message : "Logged succesfully"});
		}
		else{
			callback({result : false ,message : "Could not login"});
		}
	}
	var editshoe = function(shoe,token,callback){

		if (token === _adminToken){
			if (shoe.image !== "")
				{shoe.image = "images/fashion/" + shoe.image;}
			else
				{delete shoe.image;}
				db.edit(shoe, function(result){callback(
				{result : result ,message : "shoe edited"}
			);});

		}
		else{
			callback({result : "",message : "not authorized"});
		}
	}




	var addshoe = function(shoe,token,callback){
		if (token === _adminToken){
			shoe.image = "images/fashion/" + shoe.image;
			delete shoe._id;
			db.insertShoe(shoe, function(result){callback(
				{result : result ,message : "shoe added"}
			);});
		}
		else{
			callback({result : "",message : "not authorized"});
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

	var getshoes = function(callback){
		db.getAllShoes(function(result){callback({result : result ,message : "Showing shoes"});});
	}

	var getProducts = function(productName, callback){
		if (productName == "food"){
			db.getBulkFood(callback)
		}
		else{
			db.getBulkShoes(callback);
		}

	}


  var deleter = function(id, token,callback){
  		console.log(id);
  		if (token === _adminToken){
			db.deleter(id, function(result){callback(
				{result : result ,message : "shoe added"}
			);});
		}
		else{
			callback({result : "",message : "not authorized"});
		}
  };

	var controller = {
      "getA" : function(data, callback){getA(data, callback);},
      "login" : function(username,password,callback){login(username,password,callback);},
      "addshoe" : function(shoe,token, callback){addshoe(shoe,token, callback);},
      "getshoes" : function(callback){getshoes(callback);},
      "getProducts" : function(productName, callback){getProducts(productName, callback);},
      "editshoe" : function(shoe,token,callback){editshoe(shoe,token,callback);},
      "deleter" : function(id, token,callback){deleter(id, token,callback);}
  	}

  	return controller;
}();
