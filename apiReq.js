var request = require('request');
var async = require('async');


exports.reqTickers = function(req, res) {
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
                    callback();
                }
            )

        }, function (err){
            if (err) {
                console.log('Error');
                res.status
            }
            res.send(JSON.stringify(tickerData));
    })
}



