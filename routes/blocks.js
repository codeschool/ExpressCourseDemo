var express = require('express');
var router = express.Router();
var _ = require('lodash');

var bodyParser = require('body-parser');
var parseBlockName = require('./parse-block-name')();

var originalBlocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

var blocks = _.clone(originalBlocks);

var resetRoute = router.route('/reset');
resetRoute.get(function(request, response) {
  blocks = _.clone(originalBlocks);
  response.redirect('/');
});

var parseUrlencoded = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(function (request, response) {
    var names = Object.keys(blocks);
    if(request.query.limit >= 0){
      response.json(names.slice(0, request.query.limit));
    }else{
      response.json(names);
    }
  })
  .post(parseUrlencoded, function (request, response) {
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name);
  });

router.route('/:name')
  .all(parseBlockName)
  .get(function (request, response) {
    var description = blocks[request.blockName];

    if(!description){
      response.status(404).json('No description found for ' + request.model);
    }else{
      response.json(description);
    }
  })
  .delete(function (request, response) {
    delete blocks[request.blockName];
    response.sendStatus(200);
  });

module.exports = router;
