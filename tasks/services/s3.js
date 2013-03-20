// Generated by CoffeeScript 1.6.2
"use strict";
var AWS, BaseService, S3Service, async, fs, glob, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseService = require("./common/base-service");

glob = require("glob-manifest");

AWS = require("aws-sdk");

async = require("async");

fs = require("fs");

_ = require("lodash");

S3Service = (function(_super) {
  __extends(S3Service, _super);

  S3Service.prototype.name = 's3';

  S3Service.prototype.defaults = {
    pow: 99
  };

  function S3Service(grunt, opts, data, done) {
    this.grunt = grunt;
    this.opts = opts;
    this.data = data;
    this.done = done;
    _.bindAll(this);
    this.s3 = new AWS.S3;
    console.log(this.name);
    console.log(this.opts);
    this.run();
  }

  S3Service.prototype.run = function() {
    var _this = this;

    console.log(this.data.files);
    return glob(this.data.files.src, function(err, files) {
      if (err) {
        throw err;
      }
      return async.eachLimit(files, 5, _this.transfer, _this.transferComplete);
    });
  };

  S3Service.prototype.transfer = function(file, callback) {
    fs;    console.log("start", file);
    return setTimeout(function() {
      console.log("end", file);
      return callback(null);
    }, 500 + 500 * Math.random());
  };

  S3Service.prototype.transferComplete = function(err) {
    console.log("done");
    return this.done();
  };

  return S3Service;

})(BaseService);

module.exports = S3Service;
