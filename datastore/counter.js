const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      console.log('did not read file returning 0');
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////


exports.getNextUniqueId = (callback) => {
  // read counter file to get current counter
  // increment current counter by 1
  // write current counter to file
  // return current counter
  // return writeCounter, it runs cb which returns our zeroPaddedNumber(count)

  readCounter((err, fileData) => {
    if (err) {
      console.log('callback errored');
      callback(null, 0);
    } else {
      writeCounter(fileData + 1, (err, count) => {
        if (err) {
          throw ('error writing counter');
        }
        callback(null, zeroPaddedNumber(fileData + 1));
      });
    }
  });

};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

// counterFile = datastore/counter.js/counter.txt
exports.counterFile = path.join(__dirname, 'counter.txt');
