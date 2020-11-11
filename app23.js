// this returns a function
var express = require('express');
// this calls the function
var app = express();
//listen to port
app.listen(3000);

var request = require('request');

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})



// express can handle various 'http verbs': get, post, delete, put
app.post('/', function(req, reds) {
    request('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=1918-03-12&to=2019-03-12&apikey=81a3f7667917cdacff683f03c69b84ef', function(err, res, body) {
    reds.send(body);
});
});

