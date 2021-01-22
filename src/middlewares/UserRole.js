const adminRolAuth = (req, res, next) => {
  let data = req.user;

  if (data.role === 'admin') {
    next();
  } else {
    res.status(401).json({
      mgs: 'You must be admin for do this',
    });
  }
};

module.exports = adminRolAuth;
