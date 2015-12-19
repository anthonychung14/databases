DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id integer NOT NULL auto_increment, 
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  id integer NOT NULL auto_increment, 
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  u_id integer NOT NULL,
  FOREIGN KEY (u_id) REFERENCES users(id),
  r_id integer NOT NULL,
  FOREIGN KEY (r_id) REFERENCES rooms(id),
  comment TEXT NOT NULL,
  m_id integer NOT NULL auto_increment,
  PRIMARY KEY (m_id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

