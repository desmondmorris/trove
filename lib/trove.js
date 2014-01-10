'use strict'

var fs = require('fs');
var request = require('request');

var Trove = function(){
  var home_dir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

  var config_file = this.config_file = home_dir + '/.trove.json';
  var config = null;

  if( fs.existsSync(config_file) !== true ) {
    fs.writeFileSync(config_file, '{}');
  }
  config = fs.readFileSync(config_file, 'utf8');
  this.config = JSON.parse(config);
};

Trove.prototype.add = function(item, url, callback) {
  this.config[item] = url;
  fs.writeFile(this.config_file, JSON.stringify(this.config), function(err){
    if (err) throw err;
    callback(null, true);
  });
};

Trove.prototype.remove = function(item, callback) {
  if (!this.config.hasOwnProperty(item)) {
    callback(new Error('Item does not exist'));
    return;
  }

  delete this.config[item];

  fs.writeFile(this.config_file, JSON.stringify(this.config), function(err){
    if (err) throw err;
    callback(null, true);
  });
};

Trove.prototype.get = function(item, callback) {
  if (!this.config.hasOwnProperty(item)) {
    callback(new Error('Item does not exist'));
    return;
  }

  request(this.config[item], function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body)
    }
  })
};

module.exports = Trove;
