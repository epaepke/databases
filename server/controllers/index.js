var models = require('../models');


var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    data = data || "{}";
    callback(JSON.parse(data));
  });
};


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function (err, messages) {
        if (err) {
          console.log('error: ', err);
        } else {
          console.log('messages: ' + messages)
          sendResponse(res, {results: messages});
        }
      });
      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      collectData(req, function(messageObj) {
        models.messages.post(messageObj, function(err, message) {
          if (err) {
            console.log('error: ' + err);
          } else {
            console.log(message);
            sendResponse(res, {message:message}, 201);
          }
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

