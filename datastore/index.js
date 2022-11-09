const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    var filePath = path.join(exports.dataDir, id + '.txt');
    fs.writeFile(filePath, text, (err) => {
      callback(null, { id, text });
    });
  });
};

exports.readAll = (callback) => {
  // fs.readdirSync(path, options)
  var data = fs.readdirSync(exports.dataDir);
  data = _.map(data, (id) => {
    var object = {};
    var numberOnly = id.slice(0, 5);
    object['id'] = numberOnly;
    object['text'] = numberOnly;
    return object;
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var filePath = path.join(exports.dataDir, id + '.txt');
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      console.log('did not read file');
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id: id.slice(0, 5), text: fileData.toString()});
    }
  });
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
