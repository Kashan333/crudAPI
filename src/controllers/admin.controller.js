const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });
    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const loginAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const admin = await Admin.findOne({ where: { username } });
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }
    
//     console.log(typeof password); // add this line to check the type of password
//     const passwordString = password.toString(); // convert password to string
//     console.log(typeof passwordString); // add this line to check the type of passwordString
    
//     const passwordMatch = await bcrypt.compare(passwordString, admin.password);
    
//     if (!passwordMatch) {
      
//       return res.status(401).json({ message: 'Incorrect password' });
   
//     }
//     const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// async function loginAdmin(req, res) {
//   const { username, password } = req.body;
//   const admin = await Admin.findOne({ where: { username } });

//   if (!admin || admin.password !== password) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   if (!process.env.JWT_SECRET) {
//     return res.status(500).json({ message: 'JWT secret is not defined' });
//   }

//   const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   return res.json({ admin, token });
// }
async function loginhandler(req, res) {
  let { username, password } = req.body;
  let isAvailable = await Admin.findOne({
    where: {
      username: username
      
    }
  });
  
  if (!isAvailable) {
    return res.status(400).send({ message: "User does not exist" });
  }
  let match = await Admin.findOne({
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

  return res.status(200).send({ name: 'Admin successfully login' });
}



const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [numAffectedRows, affectedRows] = await Admin.update({ username, password: hashedPassword }, { where: { id: adminId }, returning: true });
    if (numAffectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(affectedRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const numAffectedRows = await Admin.destroy({ where: { id: adminId } });
    if (numAffectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAdmin,
  loginhandler,
  getAdminById,
  updateAdminById,
  deleteAdminById
};
