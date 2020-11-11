var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log('request was made from ' + req.url);
    
    // Set the head of the response, but not the content
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // create readable stream. first arg is same directory plus filename, 
    // second param is encoding instruction, otherwise you get numbers.
    var stream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    
    // piping from the readable stream, 'stream' to the writable stream, 'res'
    stream.pipe(res)
    
});

server.listen(3000, '127.0.0.1');
console.log('Now listening on port 3000.')

