var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var bodyParser = require('body-parser');
var logger = require('morgan');
var clave = require('./clave/clave');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var perfilRouter = require('./routes/perfil');
var eventosRouter = require('./routes/eventos');
var empresasRouter = require('./routes/empresas');
var detalleDocumentoRouter = require('./routes/detalledocumentos');
var maestroDocumentoRouter = require('./routes/maestrodocumentos');
var moduloRouter = require('./routes/modulos');
var rolePermisoRouter = require('./routes/rolepermisos');

var app = express();

app.use(logger('dev'));
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.set('llave', clave.llave);
app.set('llaveRefresh', clave.llaveRefresh);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/perfiles', perfilRouter);
app.use('/eventos', eventosRouter);
app.use('/empresas', empresasRouter);
app.use('/detalledocumentos', detalleDocumentoRouter);
app.use('/maestrodocumentos', maestroDocumentoRouter);
app.use('/modulos', moduloRouter);
app.use('/rolepermisos', rolePermisoRouter);

module.exports = app;
