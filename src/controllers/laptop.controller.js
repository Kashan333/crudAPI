const Laptop = require('../models/laptop.model');
const { Op } = require('sequelize');


  // create a new laptop
  const createLaptop= async (req, res, next) => {
    try {
      const { name, brand, price, inventory } = req.body;
      const laptop = await Laptop.create({ name, brand, price, inventory });
      res.status(201).json(laptop);
    } catch (error) {
      next(error);
    }
  };

  // get all laptops
  const getAllLaptops= async (req, res, next) => {
    try {
      const laptops = await Laptop.findAll();
      res.status(200).json(laptops);
    } catch (error) {
      next(error);
    }
  };

  // get a laptop by id
  const getLaptopById= async (req, res, next) => {
    try {
      const { id } = req.params;
      const laptop = await Laptop.findByPk(id);
      if (laptop) {
        res.status(200).json(laptop);
      } else {
        res.status(404).json({ message: `Laptop with id ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  };

  // update a laptop by id
 const  updateLaptopById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, brand, price, inventory } = req.body;
      const laptop = await Laptop.findByPk(id);
      if (laptop) {
        await laptop.update({ name, brand, price, inventory });
        res.status(200).json(laptop);
      } else {
        res.status(404).json({ message: `Laptop with id ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  };

  // delete a laptop by id
 const  deleteLaptopById= async (req, res, next) => {
    try {
      const { id } = req.params;
      const laptop = await Laptop.findByPk(id);
      if (laptop) {
        await laptop.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: `Laptop with id ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  };

  const getLaptops = async (req, res) => {
    let { name, brand, minPrice, maxPrice } = req.query;
    let { page = 1, limit = 10 } = req.query;
  
    limit = parseInt(limit);
    page = parseInt(page);
  
    const where = {};
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }
    if (brand) {
      where.brand = { [Op.iLike]: `%${brand}%` };
    }
    if (minPrice && maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      where.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      where.price = { [Op.lte]: maxPrice };
    }
  
    const offset = (page - 1) * limit;
  
    const { count, rows } = await Laptop.findAndCountAll({
      where,
      limit,
      offset,
    });
  
    const totalPages = Math.ceil(count / limit);
  
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
  
    return res.json({
      data: rows,
      page,
      limit,
      totalPages,
      totalCount: count,
      nextPage,
      prevPage
    });
  };
  


module.exports = { getLaptops,deleteLaptopById,updateLaptopById,createLaptop,getAllLaptops,getLaptopById };

