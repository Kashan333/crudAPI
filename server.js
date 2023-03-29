const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

const customerRoutes = require('./src/routes/customer.route.js')
app.use('/api/v1/customer', customerRoutes)
// app.post("/login", customerRoutes.login);

const laptopRoutes = require('./src/routes/laptop.route.js')
app.use('/api/v1/laptop', laptopRoutes)
const orderRoutes = require('./src/routes/order.route.js');

app.use('/api/v1/order', orderRoutes)


// const jwt=require("jsonwebtoken");
// const createToken= async()=>{
//   const Token=await jwt.sign({_id:"1"},"helloworldIamkashanandiamyourdadhowareyou",{expiresIn:"1 hour"});
  
//   console.log(Token);
//   const userVer= jwt.verify(Token,"helloworldIamkashanandiamyourdadhowareyou")
//   console.log(userVer); 
 
// }
// createToken();
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
