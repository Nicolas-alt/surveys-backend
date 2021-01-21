const jwt = require('jsonwebtoken');

const userTokenAuth = (req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, process.env.SEED, (err, tokenDecoded) => {
    if (err) return res.status(401).json({ msg: 'You must be loggin', err });

    req.user = tokenDecoded;
    next();
  });
};

module.exports = userTokenAuth;
