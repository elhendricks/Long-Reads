var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
    console.log('Request handler "start" was called');

    var body = '<html>' +
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data"'+
    'method = "post">' +
    '<input tupe="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request Handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function(err, fields, files) {
        if (error) {
            fs.unlink("/tmp/test.png");
            fs.renme(files.upload.path, "/tmp/test.png");
        }
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("received image: <br/>");
    response.write("<img src='/show' />");
    response.end();
}

function show(response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;