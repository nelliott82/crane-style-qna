const fs = require('fs');
const path = require('path');


fs.readFile(path.join(__dirname, 'questions.csv'), 'utf8', function (err, data) {
  var dataArray = data.split(/\r?\n/);
  console.log(dataArray);
});
