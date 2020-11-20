var request = require('request');

exports.logger = function () {
    console.log('testing import');
}

function reqSingleTicker(symbol) {
    request('https://financialmodelingprep.com/api/v3/historical-price-full/'+ symbol + 
    '?from=2015-03-12&to=2019-03-12&apikey=81a3f7667917cdacff683f03c69b84ef', function(err, res, body) {
    response.send(body);
    console.log(req.query['one'])})}


