DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id int UNSIGNED AUTO_INCREMENT,
  roomname varchar(20) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (roomname)
);


CREATE TABLE users (
  id int UNSIGNED AUTO_INCREMENT,
  username varchar(20)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username) 
);

CREATE TABLE messages (
  id int UNSIGNED AUTO_INCREMENT,
  user_id int UNSIGNED,
  room_id int UNSIGNED,
  message_text text,
  created_at datetime NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id), 
  FOREIGN KEY (room_id) REFERENCES rooms (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

