const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/express-mongoose", {useNewUrlParser: true}).then((result) => {
    console.log(`Conectado a la BD ${result.connections[0].name}...`);
}).catch((reason) => {
    console.log(`Error: ${reason}`);
});

const app = express();

app.use(logger('dev'));
// Módulo que se basa en el bodyperser para convertir json a objetos:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Para agregarle un prefijo a todas las rutas que hay en el archivo usersRouter
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
