CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT(11) NOT NULL, 
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  id INT(11) NOT NULL, 
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  u_id INT(11) NOT NULL,
  FOREIGN KEY (u_id) REFERENCES users(id),
  r_id INT(11) NOT NULL,
  FOREIGN KEY (r_id) REFERENCES rooms(id),
  comment TEXT NOT NULL,
  m_id INT(11) NOT NULL,
  PRIMARY KEY (m_id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

