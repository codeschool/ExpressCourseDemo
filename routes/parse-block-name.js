module.exports = function() {
  return function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = block;  
    next();
  }
};
