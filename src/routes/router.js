const express = require('express');
const router = express.Router();
const customers = require('../controllers/customer.controller');
const laptops = require('../controllers/laptop.controller');
const orders = require('../controllers/order.controller');
const adminController = require('../controllers/admin.controller');
const AddToCartController = require('../controllers/addTocart.controller');
const reviewController = require('../controllers/review.controller');
const inventoryController = require('../controllers/inventory.controller');


// const Laptop=require('../models/laptop.model');
// const AddToCart=require('../models/addTocart.model');
// const Customer=require('../models/customer.model');



// Create a new Customer
router.post('/customer', customers.createCustomer);
router.post('/customers/:customerId/cart/:laptopid/:quantity',customers.addToCart);
// Retrieve all Customers
router.get('/customer', customers.getAllCustomers);
router.post('/customer/login', customers.loginhandler);

// Retrieve a single Customer with id
router.get('/customer/:id', customers.getCustomerById);

// Update a Customer with id
router.put('/customer/:id', customers.updateCustomerById);

// Delete a Customer with id
router.delete('/customer/:id', customers.deleteCustomerById);


//LAPTOP--------------------------------------
router.post('/laptop', laptops.createLaptop);

// Retrieve all Laptops
router.get('/laptop', laptops.getAllLaptops);
router.get('/laptops', laptops.getLaptops);
// Retrieve a single Laptop with id
router.get('/laptop/:id', laptops.getLaptopById);

// Update a Laptop with id
router.put('/laptop/:id', laptops.updateLaptopById);

// Delete a Laptop with id
router.delete('/laptop/:id', laptops.deleteLaptopById);


//Order--------------------------------------
router.post('/order', orders.createOrder);

// Retrieve all Orders
router.get('/order', orders.getAllOrders);

// Retrieve a single Order with id
router.get('/order/:id', orders.getOrderById);

// Update an Order with id
router.put('/order/:id', orders.updateOrder);

// Delete an Order with id
router.delete('/order/:id', orders.deleteOrder);

router.get('/orders', orders.getOrders);




// Create a new admin
router.post('/admin/', adminController.createAdmin);

// Log in an admin
//router.post('/admin/login', adminController.loginAdmin);
router.post('/admin/login', adminController.loginhandler);
// Get an admin by ID
router.get('/admin/:adminId', adminController.getAdminById);

// Update an admin by ID
router.put('/admin/:adminId', adminController.updateAdminById);

// Delete an admin by ID
router.delete('/admin/:adminId', adminController.deleteAdminById);




// Add an item to the shopping cart
router.post('/cart', AddToCartController.addToCart);

// Remove an item from the shopping cart
router.delete('/cart/:id', AddToCartController.removeFromCart);
router.delete('/cart/clear', AddToCartController.clearCart);








// GET all reviews
router.get('/review', reviewController.getAllReviews);

// GET a specific review by ID
router.get('/reviews/:id', reviewController.getReviewById);

// POST a new review
router.post('/reviews', reviewController.createReview);

// PUT update an existing review
router.put('/reviews/:id', reviewController.updateReviewById);

// DELETE a review
router.delete('/reviews/:id', reviewController.deleteReviewById);
router.get('/reviews',reviewController.getReviews);





router.get('/inventories', inventoryController.getAllInventories);
router.get('/inventories/:id', inventoryController.getInventoryById);
router.post('/inventories', inventoryController.createInventory);
router.put('/inventories/:id', inventoryController.updateInventory);
router.delete('/inventories/:id', inventoryController.deleteInventory);





const authenticateAdmin = require('../middleware/adminAuthentication');




// Protected route that requires admin authentication
router.get('/admin/dashboard', authenticateAdmin, (req, res) => {
  // Access the authenticated admin user through req.admin
  res.json({ admin: req.admin });
});


module.exports = router;
