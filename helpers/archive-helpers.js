var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) throw err;
    var dataArray = data.split('\n');
    cb(dataArray);
  });

};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(dataArray) {
    cb(!!(dataArray.indexOf(url) + 1));
    // archive.isUrlInList("example1.com", cb (is =(true or false)) {
    //       expect(!!(dataArray.indexOf(url) + 1));
    //       if (++counter == total) { done() }
    //     });
    //
  });
};

exports.addUrlToList = function(url, cb) {
  // archive.addUrlToList("someurl.com", function () {
  //       archive.isUrlInList("someurl.com", function (is) {
  //         expect(is);
  //         done();
  //       });
  exports.isUrlInList(url, function(doesExist) {
    if (!doesExist) {
      //fs.appendFile(file, data[, options], callback)
      fs.appendFile(exports.paths.list, '\n' + url, 'utf8', cb);
    }
  });
};

exports.isUrlArchived = function(url, cb) {
  // archive.isUrlArchived("www.example.com", function (exists) {
  //       expect(exists);
  //       if (++counter == total) { done() }
  //     });
  fs.readFile(exports.paths.archivedSites + '/' + url, 'utf8', function(err, data) {
    cb(!err);
  });

};

exports.downloadUrls = function(urlArray) {

  //Read the contents of sites.txt
  // exports.readListOfUrls(function(dataArray){
  urlArray.forEach(function(url) { //iterates through site.txt
    exports.isUrlArchived(url, function(isArchived) {
      if (!isArchived) {
        console.log('File not found for ', url, 'Downloading...');
        var req = http.request('http://' + url, function(response) {
            response.setEncoding('utf8');
            var data = '';
            response.on('data', function(chunk) {
              data+= chunk;
            });
            response.on('end', function() {
              fs.writeFile(exports.paths.archivedSites + '/' + url , data, 'utf8', function(err){
                console.log(err);
              });
              console.log('Downloaded site HTML for:', url);
            });
          });
          req.end();
      }
    });
  });
};
