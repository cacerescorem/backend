var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary: require('bluebird')})
           .then(()=>{
               console.log('Conectado a la DB')
           })
           .catch((err)=>{
                console.error(err);
           })

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': false}));


app.use('/proveedor', proveedor);

app.listen(3000, function(){
    console.log('Servidor Ok en puerto 3000')
})