var db = require('../db/index');

db.connect();

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, rows) {
        if (err) {
          callback(err, null);
        } else {
          console.log(rows);

          callback(null, rows);
        }
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      
      db.query('INSERT INTO messages (user_id, room_id, created_at, message_text) VALUES (1,1, NOW(), \'hello world\')', function(err, res) {
        if (err) {
          callback(err, null);
        } else {
          console.log(res);
          callback(null, res);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

