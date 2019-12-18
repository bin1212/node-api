var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var jwt = require('express-jwt')
const blacklist = require('express-jwt-blacklist');
// var bodyParser = require('body-parser');
var logger = require('morgan');
var env = require('./config/mode_env');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authVerify = require('./api/register')
var userMsg = require('./api/userMsg')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var noAuthUrl = ['/api/auth/login','/api/auth/register']

if(env != 'production'){
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method == 'OPTIONS') {
      res.sendStatus(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });
}
blacklist.configure({
  tokenId: 'blackIdBin',
});
app.use(jwt({secret: 'secretbin1995',isRevoked:blacklist.isRevoked}).unless({
  path: noAuthUrl //除了这些地址，其他的URL都需要验证
}));
// app.use(function(req, res, next){
//   if(noAuthUrl.includes(req.originalUrl)){
//     // return next()
//   }
//   var token = req.body.token || req.query.token || req.headers["authorization"];
//   console.log(token)
//   jwt.verify(token,'secretbin1995',function(){
//     res.send({
//       success: false,
//       message: 'Failed to authenticate token. Make sure to include the ' +
//           'token returned from /users call in the authorization header ' +
//           ' as a Bearer token'
//     });
//     return;
//   })
//   // return next()
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authVerify);
app.use('/api/userMsg', userMsg);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('hhhh',err.name)
  // render the error page
  if(err.name == 'UnauthorizedError'){
    if(req.method == 'OPTIONS'){
      res.send(200)
    }else{
      res.status(401).send('invalid token')
    }
  }else{
    res.status(err.status || 500);
  }
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
