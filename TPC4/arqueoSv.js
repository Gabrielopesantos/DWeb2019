var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    var partes = req.url.split('/')
    var file = partes[partes.length - 1]
    console.log(file)
    if (file <= 244) {
        fs.readFile('files/arq' + file + '.xml', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/xml' })
            res.write(data)
            res.end
        })

    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write("File inexistente: " + file)
        res.end
    }
}).listen(7777)