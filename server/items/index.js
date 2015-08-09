let express = require('express');
let app     = express();
let fs      = require('fs');
let path    = require('path');

app.get('/api/items', function(req, res) {
  let datapath = path.join(__dirname, 'items.json');

  fs.readFile(datapath, function(err, buffer) {
    if(err) res.status(500).send(err);

    let data = buffer.toString();
    let json = JSON.parse(data);
    res.json(json);
  });
});

module.exports = app;
