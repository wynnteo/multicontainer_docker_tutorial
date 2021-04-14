var express = require('express');
var path = require('path');
var app = express();
var dist = path.resolve(__dirname + '/../dist/client');
var fallbackPath = path.resolve(dist + '/index.html');
var port = 4200;
var datetime = "LastSync: " + new Date();

app.use(express.static(dist));

app.get('*', function(req, res) {
    res.sendFile(fallbackPath);
});

var lastsync = datetime + ': Dashboard is on port ' + port + '!'

app.listen(port, () => console.log(lastsync));
