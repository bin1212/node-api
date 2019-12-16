var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.send('respond with a resource');
});
router.get('/a', function(req, res, next) {
  res.send('respond with a resources');
});

module.exports = router;
