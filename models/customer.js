var mongoose = require("mongoose");
var customerSchema = mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	mobile:{
		type:String,
		required:true
	}
});

var Customer=module.exports=mongoose.model("customer",customerSchema,"customer")
module.exports.getCustomers = function(callback){
	return Customer.find(callback)
	
}
//for accepting post request
module.exports.createCustomer = function(custObj,callback){
	return Customer.create(custObj,callback)
}

module.exports.editCustomer = function(custId,custObj,callback){
	return Customer.update({_id:custId},
							{$set:{
								name :custObj.name,
								email :custObj.email,
								mobile:custObj.mobile
							}},callback)
}