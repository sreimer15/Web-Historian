var path = require('path');
var httpHelpers = require('./http-helpers.js');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // look in our paths object, if req exists in object
  //  get value in that key 
  // writefile.path have the 

  //for a GET request
  if(req.method === 'GET') {
    //check if the url is empty
    if (req.url === '/'){
      httpHelpers.serveAssets(res, 'index');
    }
    else {

      fs.readFile(archive.paths.archivedSites + '/' + req.url,  'utf8', function(err,data){
        if(err){ //127.0.0.1:8080/253463fdgfg
          res.writeHead(404,httpHelpers.headers);
          res.end();
          return;
        }
        httpHelpers.serveAssets(res, req.url);
      });
      //fs.readfile on the url
      //on err, send a 404
      //otherwise call this function vvvv
    }
  }

  
  //for a POST request
  if(req.method === 'POST') {
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      data = data.substring(4);
      httpHelpers.serveAssets(res, data, 302);
    })
  }
};
