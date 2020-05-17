const fs = require('fs');
const sleep = require('./lib/util/sleep');
const tweet = require('./lib/tweet');
const DateUtil = require('./lib/date_util');
const dateUtil = new DateUtil();

let pin = 17;
let gpioDir = '/sys/class/gpio/';

function switchOnCallback() {
  fs.writeFile(gpioDir + 'export', pin, function(err) {
    fs.writeFile(gpioDir + 'gpio' + pin + '/direction', 'in', function(err) {
      console.log('start');
      function iterate() {
        fs.readFile(gpioDir + 'gpio' + pin + '/value', 'utf8', function(err, data) {
          if(err) return console.log('(18)', err);
          if(data === '0\n') {
            console.log(data);
            // fs.writeFile(gpioDir + 'unexport', pin, function(err) {
            //   console.log("end");
            // });
            tweet(`${new DateUtil().formatedDate()}\n${pin}番のボタンが押されました。`, function(tweet){
              iterate();
            });
          } else {
            iterate();
          }
        });
      }
      iterate();
    });
  });
}

switchOnCallback();
