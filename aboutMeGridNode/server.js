const express = require('express'); //Sets up the express module
const app = express();
const port = 443;
const path = require('path')

let server = app.listen(port, function() {
  console.log("App server is running on port", port);
  console.log("to end press Ctrl + C");
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'homePage.html'));
});
app.get(['/*.html', '/*.css', '/*.js', '/*.jpg', '/*.jpeg'], (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

app.get('/mefacts', function(req, res) {
  res.sendFile(path.join(__dirname, 'mefacts.html'));

});
app.get('/main', function(req, res) {
  res.sendFile(path.join(__dirname, 'main.html'));

});
app.get('/coolsites', function(req, res) {
  res.sendFile(path.join(__dirname, 'coolSites.html'));

});
