
// based on https://github.com/visionmedia/express/blob/master/examples/static-files/index.js
var http = require("http")
var st = require("st")
var Router = require("http-hash-router")

var app = Router()

// Serve all the static assets prefixed at /static
// so GET /static/js/app.js will work.
app.set("*", st({
    path: __dirname,
    index: 'index.html'
  })
)

var server = http.createServer(function handler(req, res) {
  app(req, res, {}, onError)

  function onError(err) {
        if (err) {
            res.statusCode = err.statusCode || 500;
            res.end(err.message);
        }
    }
})

server.listen(3000)

console.log("server listening on port 3000")
