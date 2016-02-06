var models = require('../models');


var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function (response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function (err, messages) {
        if (err) {
          console.log('error: ', err);
        } else {
          // console.log('messages: ' + JSON.stringify(messages));
          sendResponse(res, {results: messages});
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function (err, message) {
        if (err) {
          console.log('error: ' + err);
        } else {
          console.log('controller message: ' + JSON.stringify(message));
          sendResponse(res, {message: message}, 201);
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function (err, users) {
        if (err) {
          console.log('error: ', err);
        } else {
          sendResponse(res, {results: users});
        }
      });
    },
    post: function (req, res) {
     models.users.post(req.body, function (err, result) {
        if (err) {
          console.log('error: ' + err);
        } else {
          console.log('controller message: ' + JSON.stringify(result));
          sendResponse(res, {message: result}, 201);
        }
      });
    }
  }
};

