var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const jwtAuth = require('./lib/jtwAuth');

const i18n = require('./lib/i18nSetup')();

require('dotenv').config();

var app = express();

require('./lib/connectMongoose');
require('./models/Anuncio');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n.init);

const loginJWT = require('./routes/loginJWT');
// //Rutas del controlador
app.get('/login', loginJWT.index);
app.post('/login', loginJWT.postLoginJWT);

app.use('/',                        require('./routes/index'));
app.use('/',                         require('./routes/tags'));
app.use('/apiv1/anuncios', jwtAuth(),   require('./routes/apiv1/anuncios')); //, jwtAuth()
app.use('/apiv1/tags',   jwtAuth(),      require('./routes/apiv1/tags')); //, jwtAuth()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error(__('Not Found'));
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) ?
      { message: 'Not valid', errors: err.mapped()}
      : `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || __(500));
  //si es petición al api respondo json
  if (isAPI(req)) {
    res.json({ok: false, error: err.message});
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
