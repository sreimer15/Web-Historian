var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // look in our paths object, if req exists in object
  //  get value in that key 
  // writefile.path have the 

  //for a GET request
    //response is a site's HTML
  //for a POST request
    //check if the site's HTML is already archived
      //if not, create a cached version of that site's HTML
  res.end(archive.paths.list);
};
