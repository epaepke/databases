DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id int  UNSIGNED AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE users (
  id int  UNSIGNED AUTO_INCREMENT,
  name varchar(20)  NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id int  UNSIGNED AUTO_INCREMENT,
  user_id int UNSIGNED,
  room_id int UNSIGNED,
  created_at datetime NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id), 
  FOREIGN KEY (room_id) REFERENCES rooms (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

