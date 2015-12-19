var db = require('../db');

// ****** delete later ******
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "hello",
  database: "chat"
});


// *************************





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
    post: function (req, callback) {
      // parse req into json 
      console.log(req.body)
      var message = req.body
      dbConnection.connect(function(err) {
        if (err) {console.log("NOOOOOOOO, in the pooooooost");}
        else {console.log("connection successful")}
      });

      dbConnection.query('INSERT INTO rooms(name) values(?)', [message.roomname], function (err, roomResult) {
          if (err) {console.log("this thing ain't a working")};
          
          // should close connection
          dbConnection.query('INSERT INTO users(name) values(?)', [message.username], function (err, userResult) {
            if (err) {console.log("this thing ain't a working")};
            //console.log('in the user',result.insertId);

            dbConnection.query('INSERT into messages (u_id, r_id, comment) Values(?, ?, ?);',
                               [userResult.insertId, roomResult.insertId, message.comment], 
                               function (err, result) {
              if (err) {console.log("this thing ain't a working")};
              console.log('messages doin shit!',result.insertId);
            });
          });
        });
          // console.log("rooms are ", result);
          // var r_id = result.insertId;

          // dbConnection.query('INSERT INTO users SET ?', {name: message.username}, function (err, result) {
          //   if (err) throw err;
          //   // should close connection
          //   console.log("users are ", result);
          //   var u_id = result.insertId;

          //   var messageInsert = 'INSERT into messages (u_id, r_id, comment) Values(?, ?, ?);';

          //   dbConnection.query(messageInsert, [u_id, r_id, message.comment], function (err, result) {
          //     if (err) throw err;
          //     // should close connection
          //     console.log("message is ", result);
          //     var m_id = result.insertId;
          //   });
          // });
        // });
      //json_data -> request to db
      // return transformed db call to json
    // } // a function which can be used to insert a message into the database
  }
},

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

