const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) return res.sendStatus(403);

    const admin = await Admin.findOne({ where: { id: decodedToken.id } });
    if (!admin) return res.sendStatus(401);

    req.admin = admin;
    next();
  });
}

module.exports = authenticateAdmin;
