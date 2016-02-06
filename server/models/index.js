var db = require('../db/index');

db.connect();

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT u.username, m.id AS objectID, m.message_text AS text, r.roomname FROM users u INNER JOIN messages m ON (m.user_id = u.id) INNER JOIN rooms r ON (m.room_id = r.id)', function(err, rows) {
        if (err) {
          callback(err, null);
        } else {
          console.log(rows);
          callback(null, rows);
        }
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      console.log(JSON.stringify(message));
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

