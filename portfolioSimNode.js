// this returns a function
var express = require('express');
// this calls the function
var app = express();

var async = require('async');
//listen to port
app.listen(3000);


var request = require('request');

app.set('view engine', 'ejs');
app.use( express.static( __dirname + '/client' ));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})



// express can handle various 'http verbs': get, post, delete, put
app.post('/getdata', function(req, response) {
    console.log(req.body)
});


