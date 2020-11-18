var request = require('request');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var async = require('async');
//listen to port
app.listen(3000);





app.set('view engine', 'ejs');
app.use( express.static( __dirname + '/client' ));




app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})



// express can handle various 'http verbs': get, post, delete, put
app.post('/getdata', function(req, response) {
    console.log(req.body)
});


