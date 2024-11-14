const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // We'll use this to determine file types for responses

// Path to your files folder (same folder as server.js)
const folderPath = './';

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Handle requests for files (e.g., index.html, .jpg, .patt)
  const filePath = path.join(folderPath, req.url === '/' ? 'Test2.html' : req.url); // Default to 'index.html' if root URL

  // Check if the file exists
  fs.exists(filePath, (exists) => {
    if (!exists) {
      // If file does not exist, return a 404 error
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    // Get the file extension and determine the correct MIME type
    const extname = path.extname(filePath);
    const mimeType = mime.lookup(extname) || 'application/octet-stream'; // Default to binary stream if MIME type is not found

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(data);
    });
  });
});

// Listen on port 80 (requires administrator privileges on Windows)
server.listen(80, () => {
  console.log('Server is running on http://localhost:80');
});
