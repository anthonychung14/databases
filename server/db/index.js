var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var dbConnection = mysql.createConnection({
  user: "root",
  password: "hello",
  database: "chat"
});

var connectToServer = function() {
  dbConnection.connect(function(err) {
  if (err) {console.log("NOOOOOOOO");}
    });
};

module.exports.db = dbConnection


