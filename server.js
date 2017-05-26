var express = require("express")
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Customer = require("./models/customer")
var bodyParser = require("body-parser");
app.use(bodyParser.json())//to get data from post in json format
app.use(bodyParser.urlencoded({extended:true}))//to get response in encodede format
mongoose.connect("mongodb://localhost/techminds",function(){
	console.log("connected to database sucessfully !!!!");
})
router.get("/customers",function(request,response){
	Customer.getCustomers(function(err,customerdata){
		if(err){
			console.log("inside customers call back")
		}
		response.json(customerdata)
	})
})

router.post("/customer",function(request,response){
	var customerObj = request.body;//to get posted data
	Customer.createCustomer(customerObj,function(err,customerdetails){
		if(err){
			throw err;
		}
		response.json(customerdetails)
	})
})

router.get("/customer/:id",function(request,response){
	var customerId= request.params.id;
	Customer.getCustomerById(customerId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get("/",function(request,response){
	response.send ({message:"Hello"})
})

router.put("/customeredit/:id",function(request,response){
	var customerId= request.params.id;
	var dataFromCustomer = request.body;
	
	  Customer.getCustomerById(customerId,function(err,dataFromDb){
		if(err){
			throw err;
		}
		console.log(dataFromDb);
		var bodyObj = {
			name : dataFromCustomer.name || dataFromDb.name,
			email : dataFromCustomer.email || dataFromDb.email,
			mobile : dataFromCustomer.mobile || dataFromDb.mobile
		}
		Customer.editCustomer(customerId,bodyObj,function(err,data){
			if(err){
				throw err;
			}
			response.json(data)
		})
	});
	
})

router.delete("/customerdelete/:id",function(request,response){
	var customerId = request.params.id;
	Customer.deleteCustomer(customerId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

app.use("/api",router);

var port = process.env.PORT || 4001;
app.listen(port,function(){
	console.log("serever is listening ")
})
