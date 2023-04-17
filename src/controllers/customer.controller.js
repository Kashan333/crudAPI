const Customer = require('../models/customer.model');
const Laptop=require('../models/laptop.model');
const AddToCart=require('../models/addTocart.model');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const addToCart = async function (req, res, next) {
  try {
    const customerId = req.params.customerId;
    const laptopId = req.params.laptopid;
    const quantity = req.params.quantity;

    if (!laptopId || isNaN(laptopId)) {
      throw new Error('Invalid laptop ID');
    }
    
    if (!quantity || isNaN(quantity) || quantity < 1) {
      throw new Error('Invalid quantity');
    }

    const laptop = await Laptop.findByPk(laptopId);
    if (!laptop) {
      throw new Error('Laptop not found');
    }

    const [cartItem, created] = await AddToCart.findOrCreate({
      where: {
        customer_id: customerId,
        laptop_id: laptopId
      },
      defaults: {
        quantity: quantity
      }
    });
    
    if (!created) {
      // If the cart item already exists, update its quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    }
    
    res.status(200).json({
      message: 'Item added to cart successfully!',
      cartItem: cartItem
    });
    

  } catch (error) {
    next(error);
  }
};








// const addToCart = async function (laptopId, quantity) {
//   if (!laptopId || isNaN(laptopId)) {
//     throw new Error('Invalid laptop ID');
//   }
  
//   if (!quantity || isNaN(quantity) || quantity < 1) {
//     throw new Error('Invalid quantity');
//   }

//   const laptop = await Laptop.findByPk(laptopId);
//   if (!laptop) {
//     throw new Error('Laptop not found');
//   }

//   const [addToCart, created] = await AddToCart.findOrCreate({
//     where: {
//       customer_id: this.id,
//       laptop_id: laptopId
//     },
//     defaults: {
//       quantity: quantity
//     }
//   });

//   if (!created) {
//     addToCart.quantity += quantity;
//     await addToCart.save();
//   }

//   return addToCart;
// };




// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a customer by ID
const updateCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.update(req.body);
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a customer by ID
const deleteCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.destroy();
      res.json({ message: 'Customer deleted' });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
async function loginhandler(req, res) {
  let { username, password } = req.body;
  let isAvailable = await Customer.findOne({
    where: {
      username: username
      
    }
  });
  
  if (!isAvailable) {
    return res.status(400).send({ message: "User does not exist" });
  }
  let match = await Customer.findOne({
    where: {
      password: isAvailable.password
      
    }
  });
  if (match) {
    return res.status(400).send({ message: "correct password" });
  }
  // let passMatch = bcrypt.compareSync(password, isAvailable.password);
  // console.log(passMatch);
  // console.log(isAvailable.password);
  // console.log(password);
  // if (passMatch) {
  //   return res.status(400).send({ message: "Password is incorrect" });
  // }

  return res.status(200).send({ name: 'Customer successfully login' });
}

module.exports = {
  loginhandler,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  addToCart
};
