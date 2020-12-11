var request = require('request');
var async = require('async');


exports.reqTickers = function(req, res) {
    var tickers = [];
    for (ticker in req.body) {
        if (ticker != 'date') {
        tickers.push(ticker);
        }
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
                    data['percentage'] = req.body[ticker];
                    tickerData.push(data);
                    callback();
                }
            )

        }, function (err){
            if (err) {
                console.log('Error');
                res.status
            }
            res.send(tickerData);
    })
}



