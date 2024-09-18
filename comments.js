// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];

http.createServer(function(req, res) {
    // Parse the request URL
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    // Check the request URL
    if (pathname === '/') {
        // Read the HTML file
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
                res.end('Read file error');
                return;
            }
            res.end(data);
        });
    } else if (pathname === '/comments') {
        // Check the request method
        if (req.method === 'GET') {
            // Convert comments array to JSON string
            var str = JSON.stringify(comments);
            // Write the response header
            res.setHeader('Content-Type', 'application/json');
            // Write the response data
            res.end(str);
        } else if (req.method === 'POST') {
            // Read the request data
            var str = '';
            req.on('data', function(chunk) {
                str += chunk;
            });
            req.on('end', function() {
                // Convert the request data to JSON object
                var obj = JSON.parse(str);
                // Add the JSON object to comments array
                comments.push(obj);
                // Convert comments array to JSON string
                var str = JSON.stringify(comments);
                // Write the response header
                res.setHeader('Content-Type', 'application/json');
                // Write the response data
                res.end(str);
            });
        }
    } else {
        // Read the static file
        fs.readFile(pathname.slice(1), function(err, data) {
            if (err) {
                console.log(err);
                res.end('Read file error');
                return;
            }
            res.end(data);
        });
    }
}).listen(3000, function() {
    console.log('Web server running at http://localhost:3000');
});
// Run the web server
// Open the web browser and visit the URL http://localhost:3000
// Input the comment and click the submit button
// Check the network request and response in the browser developer tools
// Check the comments in the web server terminal
// Open the web browser and visit the URL http://localhost:3000/comments