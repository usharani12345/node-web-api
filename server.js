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

router.get("/",function(request,response){
	response.send ({message:"Hello"})
})

router.put("/customer/:id",function(request,response){
	var customerId= request.params.id;
	var customerdata = request.body;
	Customer.editCustomer(customerId,customerdata,function(err,data){
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
