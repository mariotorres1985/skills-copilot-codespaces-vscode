// Create web server with Node.js
// Run: node comments.js
// Open: http://localhost:3000/
// Test: http://localhost:3000/comments?postId=1

// Import modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// Create server
http.createServer(function (req, res) {
    // Get path
    var path = url.parse(req.url).pathname;
    // Get query
    var query = url.parse(req.url, true).query;
    
    // Check path
    if (path == '/comments') {
        // Check query
        if (query.postId) {
            // Read file
            fs.readFile('comments.json', function (err, data) {
                // Check error
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error');
                } else {
                    // Parse data
                    var comments = JSON.parse(data);
                    // Get comments
                    var result = comments.filter(function (comment) {
                        return comment.postId == query.postId;
                    });
                    // Write response
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end(JSON.stringify(result));
                }
            });
        } else {
            // Write response
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('No comments');
        }
    } else {
        // Write response
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
    }
    
}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/');