var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
   
    // Set the head of the response, but not the content
    res.writeHead(200, {'Content-Type': 'text/html'});

    if (req.url === '/' || req.url === '/home') {
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res)
    }

    else {
        res.end('404')
    }
    
    
    
});

server.listen(3000, '127.0.0.1');
console.log('Now listening on port 3000.')

