let express      = require('express');
let app          = express();
let serveStatic  = require('serve-static');
let path         = require('path');

app.use('/public', serveStatic(path.join(__dirname, '../client')));
app.use('/public/libs', serveStatic(path.join(__dirname, '../bower_components')));

app.use(require('server/home'));
app.use(require('server/items'));

app.listen(8000, function() {
  console.log('Listening on 8000');
});
