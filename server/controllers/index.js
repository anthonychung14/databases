var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      
      models.messages.get(req, function(data){
        // TODO: parse and send data to response
        res.end(JSON.stringify(data))
        // console.log("data is: ", data_from_db);
      }); 

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('post request message successful');
      models.messages.post(req, function(data) {
        console.log(data);
        res.end(JSON.stringify(data));
      });
    } // a function which handles posting a message to the database
      
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('get request user successful')
    },
    post: function (req, res) {
      console.log('post request user successful');
      
    }
  }
};

