var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on 3000');
});
