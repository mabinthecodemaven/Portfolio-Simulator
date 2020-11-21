var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var apiReq = require('./apiReq');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//listen to port
app.listen(3000);





app.set('view engine', 'ejs');
app.use( express.static( __dirname + '/client' ));




app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})




// express can handle various 'http verbs': get, post, delete, put
app.post('/getdata', function(req, res) {
    var tickers = [];
    for (ticker in req.body) {
        tickers.push(ticker);
    }
    var tickerData = [];
    async.map(tickers,
        function(ticker, callback) {
            request('https://financialmodelingprep.com/api/v3/historical-price-full/'+ ticker + 
            '?from=2020-11-19&to=2020-11-20&apikey=81a3f7667917cdacff683f03c69b84ef',
                function(err, response, body) {
                    console.log(body)
                    tickerData.push(body);
                    console.log('hey');
                    callback();
                }
            )

        }, function (err){
            if (err) {
                console.log('Error');
            }
            res.send(JSON.stringify(tickerData));
    })
    
    
});


