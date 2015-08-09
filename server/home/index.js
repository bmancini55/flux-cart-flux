let express = require('express');
let app     = express();

app.set('view engine', 'jade');
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('index');
});

module.exports = app;
