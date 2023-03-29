'use strict';
var dbConn = require('../../config/db.config');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
;
const SECRET_KEY="NOTESAPI";
//Employee object create
var Customer = function(customer){
  this.first_name     = customer.first_name;
  this.last_name      = customer.last_name;
  this.email          = customer.email;
  this.phone          = customer.phone;
  this.organization   = customer.organization;
  this.designation    = customer.designation;
  this.salary         = customer.salary;
  this.status         = customer.status ? customer.status : 1;
  
  this.created_at     = new Date();
  this.updated_at     = new Date();
  this.password=customer.password;
};
// Customer.create = function (newCus, result) {
// dbConn.query("INSERT INTO customer set ?", newCus, function (err, res) {
// if(err) {
//   console.log("error: ", err);
//   result(err, null);
// }
// else{
//   console.log(res.insertId);
//   result(null, res.insertId);
// }
// });
// };
Customer.findById = function (id, result) {
dbConn.query("Select * from customer where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Customer.findAll = function (result) {
dbConn.query("Select * from customer", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('customer : ', res);
  result(null, res);
}
});
};
Customer.update = function(id, customer, result){
dbConn.query("UPDATE customer SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [customer.first_name,customer.last_name,customer.email,customer.phone,customer.organization,customer.designation,customer.salary, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Customer.delete = function(id, result){
dbConn.query("DELETE FROM customer WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
// Customer.login=function( password, result) {
//   dbConn.query("SELECT * FROM customer WHERE  password = ?", [ password], (err, res) => {
//       if (err) {
//           console.log("error: ", err);
//           result(err, null);
//           return;
//       }

//       if (res.length) {
//           console.log("found customer: ", res[0]);
//           result(null, res[0]);
//           return;
//       }

//       // not found Customer with the email and password
//       result({ kind: "not_found" }, null);
//   });
// };

// Customer model


Customer.create = async function (customerData) {
  const { first_name, last_name, email, phone, organization, designation, created_at, updated_at, salary, password } = customerData;

  try {
    // Check if user already exists
    const [rows] = await dbConn.query('SELECT * FROM customer WHERE email = ?', [email]);
    if (rows && rows.length > 0) {
      throw new Error('User already exists');
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

    // Return the customer and token as an object
    return { customer: newCustomer, token: token };
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};

// Customer.create = function (customerData, callback) {
//   const { first_name, last_name, email, phone, organization, designation, created_at, updated_at, salary, password } = customerData;

//   // Check if user already exists
//   dbConn.query('SELECT * FROM customer WHERE email = ?', [email], function (err, rows) {
//     if (err) {
//       console.log(err);
//       return callback(new Error('Something went wrong'));
//     }

//     if (rows && rows.length > 0) {
//       return callback(new Error('User already exists'));
//     }

//     // Hash the password
//     bcrypt.hash(password, 10, function (err, hashed) {
//       if (err) {
//         console.log(err);
//         return callback(new Error('Something went wrong'));
//       }

//       // Create a new Customer object
//       const newCustomer = {
//         first_name: first_name,
//         last_name: last_name,
//         email: email,
//         phone: phone,
//         organization: organization,
//         designation: designation,
//         salary: salary,
//         status: 1,
//         created_at: created_at,
//         updated_at: updated_at,
//         password: hashed
//       };

//       // Insert the new customer into the database
//       dbConn.query('INSERT INTO customer SET ?', newCustomer, function (err, result) {
//         if (err) {
//           console.log(err);
//           return callback(new Error('Something went wrong'));
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ email: email, id: result.insertId }, SECRET_KEY);

//         // Return the customer and token as an object
//         return callback(null, { customer: newCustomer, token: token });
//       });
//     });
//   });
// };


module.exports= Customer;