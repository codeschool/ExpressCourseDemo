var express = require('express');
var app = express();

app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

app.listen(3000, function() {
  console.log('Running Express!');
});
