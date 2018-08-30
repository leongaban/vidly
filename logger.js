const R = require('ramda');

function log(req, res, next) {
  if (!R.isEmpty(req.body)) {
    console.log('Req has body:', req.body);
  }
  next();
}

module.exports = log;
