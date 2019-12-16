var express = require('express');
var router = express.Router();
var authRouter = require('./register')

router.post('/auth',(req, res) => {
    console.log(111)
    console.log(res)
    // res.redirect('/auth');
  });

module.exports = router