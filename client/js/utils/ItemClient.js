
let request = require('superagent');

module.exports = {
  loadItems: function(callback) {
    request
      .get('/api/items')
      .end((err, res) => callback(err, res.body));
  }
};
