var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      
      models.messages.get(req, function(data){
        // TODO: parse and send data to response
        res.end(JSON.stringify(data));
        // console.log("data is: ", data_from_db);
      }); 

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('post request message successful');
      var message = req.body
      models.messages.post(req, function(message) {
        res.end(message);
      });
    } // a function which handles posting a message to the database
      
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // get all messages for a specfic user
      var username = req.body.username; // {username: 'mr incredible'}
      models.users.get(username, function(allMessagesFromUser) {
        res.end(JSON.stringify(allMessagesFromUser));
      });
      console.log('get request user successful')
    },
    post: function (req, res) {
      // add a user
      console.log('post request user successful');
      var username = req.body.username;
      models.users.post(username, function(userList) {
        res.end(JSON.stringify(userList));
      });      
    }
  }
};

