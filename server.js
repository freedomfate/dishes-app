var express = require('express');
var dishes = require('./routes/dishes');
var path = require('path');

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser()),
    app.use(express.static(__dirname + '/client')); 
    app.use(express.methodOverride()); 
});

app.get('/api/dishes', dishes.findAll);
app.get('/api/dishes/:id', dishes.findById);
app.get('*', function(req, res) {
	res.sendfile('./client/index.html');

app.listen(3000);
console.log('Listen on port 3000...');