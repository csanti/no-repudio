var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

var routes = require('./routes/index')
var nr = require('./routes/non-repudiation');

app.use(express.static('../public'));
app.use('/api/', routes);
app.use('/api/nr', nr);

app.listen(2709, function() {
    console.log('App listening on port 2709');
});

module.exports = app;

