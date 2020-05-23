const fs = require('fs');
const sleep = require('../util/sleep');
const tweet = require('../tweet');
const DateUtil = require('../util/date_util');
const dateUtil = new DateUtil();

let pin = 17;
let gpioDir = '/sys/class/gpio/';

function switchOnCallback() {
  fs.writeFile(gpioDir + 'export', pin, function(err) {
    fs.writeFile(gpioDir + 'gpio' + pin + '/direction', 'in', function(err) {
      console.log('wating start...')
      function iterate() {
        fs.readFile(gpioDir + 'gpio' + pin + '/value', 'utf8', function(err, data) {
          if(err) return console.log('(' + pin + ')', err);
          // push down
          if(data === '0\n') {
            console.log('pushed <' + pin + '>');
            tweet(`${new DateUtil().formatedDate()}\n\n${pin}番のボタンが押されました。\n\n#RaspberryPi4`, function(tweet){
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
