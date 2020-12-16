var request = require('request');
var async = require('async');

var alphaVantageKey = 'VZ961XND7VCGPLII';

exports.reqTickers = function(req, res) {
    var tickers = [];

    for (ticker in req.body['stocks']) {
        tickers.push(ticker);
    }

    console.log(req.body);
    let startDate = req.body['date'];
    
    var tickerData = [];
    
    async.map(tickers,
        function(ticker, callback) {
            
            request('https://financialmodelingprep.com/api/v3/historical-price-full/'+ ticker + 
            '?from='+ startDate +'&to=2020-11-19&apikey=81a3f7667917cdacff683f03c69b84ef',
                function(err, response, body) {
                    let data = JSON.parse(body);
                    if (data['symbol'] !== ticker.toUpperCase()) {
                        callback('500'+ticker)
                        return
                    }

                    data['percentage'] = req.body['stocks'][ticker];
                    tickerData.push(data);
                    callback();
                }
            )
        }, function (err){
            if (err) {
                console.log(err);
                res.status( parseInt(err.slice(0,3)) );
                res.send(JSON.stringify(err.slice(3, err.length)))
            }
            else{
            res.send(tickerData);
            }
    })
}



