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

	var addshoe = function(shoe,token,callback){
		if (token === _adminToken){
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


	var controller = {
      "getA" : function(data, callback){getA(data, callback);},
      "login" : function(username,password,callback){login(username,password,callback);},
      "addshoe" : function(shoe,token, callback){addshoe(shoe,token, callback);},
      "getshoes" : function(callback){getshoes(callback);}
  	}

  	return controller;
}();
