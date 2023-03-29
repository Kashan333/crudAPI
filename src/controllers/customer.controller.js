'use strict';
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Customer = require('../models/customer.model');
const SECRET_KEY="NOTESAPI";
exports.findAll = function(req, res) {
Customer.findAll(function(err, customer) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', customer);
  res.send(customer);
});
};
exports.create = function(req, res) {
const new_customer = new Customer(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Customer.create(new_customer, function(err, customer) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Customer added successfully!",data:customer});
});
}
};
exports.findById = function(req, res) {
Customer.findById(req.params.id, function(err, customer) {
  if (err)
  res.send(err);
  res.json(customer);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Customer.update(req.params.id, new Customer(req.body), function(err, customer) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Customer successfully updated' });
});
}
};
exports.delete = function(req, res) {
Customer.delete( req.params.id, function(err, cutomer) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Customer successfully deleted' });
});
};
// exports.login = function(req, res) {
  
//   const password = req.body.password;

//  Customer.login( password, (err, customer) => {
//       if (err) {
//           if (err.kind === "not_found") {
//               res.status(404).send({
//                   message: "Customer not found with email and password "  + " " + password
//               });
//           } else {
//               res.status(500).send({
//                   message: "Error retrieving Customer with email and password " + " " + password
//               });
//           }
//       } else {
//           res.send(customer);
//       }
//   });
// };
// exports.signup=async(req,res)=>
// {
//   const {id,first_name,email,password}=req.body;
//   try {
    
//     const existingUser= await Customer.findone({email:email})
//     if(existingUser)
//     {
//       return res.status(400).json({message:"user already exists"});
//     }
//     const hashed=await bcrypt.hash(password,10);
//     const result=await Customer.create({
//       id: id,
//       password: hashed,
//       first_name: first_name,
//       email:email


//     });
//     const token =jwt.sign({email:result.email, id :result.id},SECRET_KEY)  
//     res.status(201).json({user:result,token:token});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message:"something went wrong"})
//   }

//  }
// const signin=(req,res)=>
// {

// }
// module.exports={signup};
const mysql = require('mysql');
'use strict';
var dbConn = require('../../config/db.config');

exports.signup = async (req, res) => {
  const { first_name, last_name, email, phone, organization, designation, created_at, updated_at, salary, password } = req.body;

  try {
    // Check if user already exists
    const [rows] = await dbConn.query('SELECT * FROM customer WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Create a new Customer object
    const newCustomer = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      organization: organization,
      designation: designation,
      salary: salary,
      status: 1,
      created_at: created_at,
      updated_at: updated_at,
      password: hashed
    };

    // Insert the new customer into the database
    const [result] = await dbConn.query('INSERT INTO customer SET ?', newCustomer);

    // Generate a JWT token
    const token = jwt.sign({ email: email, id: result.insertId }, SECRET_KEY);

    // Return the customer and token as a JSON response
    res.status(201).json({ customer: newCustomer, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


// exports.signup = async (req, res) => {
//   try {
//     const result = await Customer.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
