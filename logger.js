module.exports = function(request, response, next) {
  var start = process.hrtime();
  var stream = process.stdout;
  var url = request.url;
  var method = request.method;

  response.on('finish', function() {
    var diff = process.hrtime(start);
    var duration = diff[0] * 1*1000 + diff[1] * 1/1000000

    var message = method  + ' to ' + url +
      '\ntook ' + duration.toFixed(3) + ' milliseconds \n\n';

    stream.write(message);
  });

  next();
};

