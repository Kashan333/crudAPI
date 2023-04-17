const Order = require('../models/order.model');
const { Op } = require('sequelize');

const Customer = require('../models/customer.model');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { date, status, total } = req.body;
    const order = await Order.create({ date, status, total });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single order by id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, status, total } = req.body;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.date = date;
    order.status = status;
    order.total = total;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an order by id
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.destroy();
    res.status(204).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getOrders = async (req, res) => {
  const { page = 1, limit = 10, status, customerId } = req.query;

  const where = {};
  if (status) {
    where.status = { [Op.eq]: status };
  }
  if (customerId) {
    where.customer_id = { [Op.eq]: customerId };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Order.findAndCountAll({
    where,
    limit,
    offset,
    include: [{ model: Customer }],
    order: [['date', 'DESC']]
  });

  const totalPages = Math.ceil(count / limit);

  return res.json({
    data: rows,
    page,
    totalPages,
    totalCount: count,
  });
};



module.exports = {getOrders,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};