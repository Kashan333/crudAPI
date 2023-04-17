const Inventory = require('../models/inventory.model');

const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.findAll();
    res.status(200).json(inventories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getInventoryById = async (req, res) => {
  const id = req.params.id;

  try {
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      res.status(404).json({ message: `Inventory with ID ${id} not found` });
    } else {
      res.status(200).json(inventory);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createInventory = async (req, res) => {
  const { laptopId, quantity } = req.body;

  try {
    const newInventory = await Inventory.create({ laptopId, quantity });
    res.status(201).json(newInventory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateInventory = async (req, res) => {
  const id = req.params.id;
  const { laptopId, quantity } = req.body;

  try {
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      res.status(404).json({ message: `Inventory with ID ${id} not found` });
    } else {
      inventory.laptopId = laptopId;
      inventory.quantity = quantity;

      await inventory.save();
      res.status(200).json(inventory);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteInventory = async (req, res) => {
  const id = req.params.id;

  try {
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      res.status(404).json({ message: `Inventory with ID ${id} not found` });
    } else {
      await inventory.destroy();
      res.status(204).json();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllInventories,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory
};
