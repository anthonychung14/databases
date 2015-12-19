var db = require('../db');

// ****** delete later ******
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "hi",
  database: "chat"
});


// *************************

var userNameHash = {};
var roomNameHash = {};



module.exports = {
  messages: {
    get: function (data, callback) {
      dbConnection.connect(function(err) {
        if (err) {console.log("NOOOOOOOO");}
        else {console.log("connection successful")}
      });

      var queryString = 'SELECT comment, users.name, rooms.name FROM (users INNER JOIN messages ON users.id = messages.u_id) INNER JOIN rooms ON messages.r_id = rooms.id;';
      dbConnection.query(queryString, function (err, result) {
          if (err) throw err;
          // should close connection
          callback(result);
        });
    }, // a function which produces all the messages
    post: function (data, callback) {
      var userName = data.body.username;
      var roomName = data.body.roomname;
      var comment = data.body.comment;

      dbConnection.connect(function(err) {
        if (err) {console.log("NOOOOOOOO, in the pooooooost");}
        else {console.log("connection successful")}
      });

      console.log(data.body);

      var queryHash = {
        getUserID: 'SELECT id from users where name = ?',
        getRoomID: 'SELECT id from rooms where name = ?',
        insertUser: 'INSERT INTO users(name) values(?)',
        insertRoom: 'INSERT INTO rooms(name) values(?)',
        insertMessage: 'INSERT into messages (u_id, r_id, comment) Values(?, ?, ?);',
        insertMessageBro: 'INSERT into messages (u_id, r_id, comment) ' +
          'SELECT users.id, rooms.id, ? FROM users, rooms WHERE rooms.name = ? AND users.name = ?;'
      };
      //INSERT into messages (u_id, r_id, comment) SELECT users.id, rooms.id, 'wtf did it work' FROM users, rooms WHERE rooms.name = 'the elephant boneyard' AND users.name = 'Mufasa';

      dbConnection.query(queryHash.insertUser, [userName], function(err, resultingUserID) {
        if (err) { // assume that tried to insert user that already exists
          console.log('user already in there!');
        } 

        dbConnection.query(queryHash.insertRoom, [roomName], function(err, resultingRoomID) {
          if (err) { // assume that tried to insert user that already exists
            console.log('room already in there!');
          } 

          dbConnection.query(queryHash.insertMessageBro, [comment, roomName, userName], function(err, messageObj) {
            if (err) { // assume that tried to insert user that already exists
              console.log('Inserting message failed miserably!\n result of insert is: ', messageObj);
            } 
          });
        });
      });
  }
},

  users: {
    // Ditto as above.
    get: function (username, callback) {
      dbConnection.connect(function(err) {
        if (err) {console.log("NOOOOOOOO");}
        else {console.log("connection successful")}
      });

      var queryString = 'SELECT comment, rooms.name FROM (users INNER JOIN messages ON users.id = messages.u_id) INNER JOIN rooms ON messages.r_id = rooms.id WHERE users.name = ?;';
      dbConnection.query(queryString, [username], function (err, result) {
          if (err) throw err;
          // should close connection
          callback(result);
        });
    },
    post: function (username, callback) {
      if (username in userNameHash) {
        callback("User already in list");
        
      } else {
        
        dbConnection.connect(function(err) {
          if (err) {console.log("NOOOOOOOO");}
          else {console.log("connection successful")}
        });

        var queryString = 'INSERT INTO users(name) values(?)';
        dbConnection.query(queryString, [username], function(err, result) {
          if (err) throw err;
          userNameHash[username] = result.insertId;
          callback(result);
        });
      }
    }
  }
};

