const AddToCart = require('../models/addTocart.model');

// Add an item to the shopping cart
const addToCart = async (req, res) => {
  const { customer_id, laptop_id, quantity } = req.body;
  try {
    // Check if the item is already in the cart
    let item = await AddToCart.findOne({
      where: {
        customer_id,
        laptop_id
      }
    });
    if (item) {
      // If the item is already in the cart, update the quantity
      item.quantity += quantity;
      await item.save();
    } else {
      // If the item is not in the cart, create a new item
      await AddToCart.create({
        customer_id,
        laptop_id,
        quantity
      });
    }
    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
};

// Remove an item from the shopping cart
const removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    let item = await AddToCart.findOne({
      where: {
        id
      }
    });
    if (item) {
      // If the item is in the cart, delete it
      await item.destroy();
      res.status(200).json({
        success: true,
        message: 'Item removed from cart successfully'
      });
    } else {
      // If the item is not in the cart, return an error
      res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
};
// Clear the shopping cart for a specific user
const clearCart = async (req, res) => {
  const { customer_id } = req.body;
  try {
    // Find all the items in the shopping cart for the specified user
    const items = await AddToCart.findAll({
      where: {
        customer_id
      }
    });
    // Delete all the items in the shopping cart
    await Promise.all(items.map(item => item.destroy()));
    res.status(200).json({
      success: true,
      message: 'Shopping cart cleared successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear shopping cart'
    });
  }
};

module.exports = {
   removeFromCart,addToCart,clearCart
  };
