// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('express-group-routes');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  let date_number = Number(req.params.date_string);
  let date_param = isNaN(date_number) ? req.params.date_string : date_number*1000;
  let date = new Date(date_param || Date.now());
  res.json({ 
    "unix": isNaN(date) ? null : date.getTime(), 
    "utc": date.toUTCString()
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
