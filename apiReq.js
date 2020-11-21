var request = require('request');
var async = require('async')

exports.logger = function () {
    console.log('testing import');
}

exports.reqSingleTicker = function (req) {
    request('https://financialmodelingprep.com/api/v3/historical-price-full/'+ symbol + 
    '?from=2015-03-12&to=2019-03-12&apikey=81a3f7667917cdacff683f03c69b84ef', 
    function(err, res, body) {
        return body
        }
    )
}

exports.reqTickers = function (tArray) {
    async.each(tArray, reqSingleTicker, 
        function (err, results) {
            console.log(results);
        }
    )
}



