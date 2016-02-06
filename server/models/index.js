var db = require('../db/index');

db.connect();

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT u.username, m.id AS objectId, m.message_text AS text, m.created_at AS createdAt, r.roomname FROM users u INNER JOIN messages m ON (m.user_id = u.id) INNER JOIN rooms r ON (m.room_id = r.id) ORDER BY m.created_at DESC', function(err, rows) {
        if (err) {
          callback(err, null);
        } else {
          // console.log(rows);
          callback(null, rows);
        }
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      console.log('posted message' + JSON.stringify(message));


      var userQuery = 'INSERT IGNORE INTO users (username) VALUES (\'' + message.username + '\')';
      var roomQuery = 'INSERT IGNORE INTO rooms (roomname) VALUES (\'' + message.roomname + '\')';
      var messageQuery = 'INSERT INTO messages (user_id, room_id, created_at, message_text) VALUES ( (SELECT id FROM users WHERE username=\'' + message.username + '\'),  (SELECT id FROM rooms WHERE roomname=\'' + message.roomname + '\'), NOW(),  \'' + message.text + '\' );';


      // db.query('INSERT IGNORE INTO users (username) VALUES (\'' + message.username + '\'); ' +
      //   'INSERT IGNORE INTO rooms (roomname) VALUES (\'' + message.roomname + '\'); ' +
      //   'INSERT INTO messages (user_id, room_id, created_at, message_text) VALUES ( (SELECT id FROM users WHERE username=\'' + message.username  + '\'),  1  , NOW(),  \'hello\' );',
      
      db.query(userQuery, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          db.query(roomQuery, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              db.query(messageQuery, function(err, res) {
                if (err) {
                  callback(err, null);
                } else {
                  console.log(res);
                  callback(null, res);
                }            
              });
            }
          });
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

