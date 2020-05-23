const fs = require('fs');
const sleep = require('../util/sleep');
const promisify = require('../util/promisify');
const writeFile = promisify(fs.writeFile);

let pin = 4;
let gpioDir = '/sys/class/gpio/';

function ledOnCallback() {
  fs.writeFile('/sys/class/gpio/export', pin, function(err) {
    fs.writeFile('/sys/class/gpio/gpio' + pin + '/direction', 'out', function(err) {
      fs.writeFile('/sys/class/gpio/gpio' + pin + '/value', 1, function(err) {
        setTimeout(() => {
          fs.writeFile('/sys/class/gpio/gpio' + pin + '/value', 0, function(err) {
            fs.writeFile('/sys/class/gpio/unexport', pin, function(err) {
              console.log("end");
            });      
          });          
        }, 100);
      });
    });
  });
}

function ledOnPromise(time) {
  writeFile(gpioDir + 'export', pin)
    .then(() => writeFile(gpioDir + 'gpio' + pin + '/direction', 'out'))
    .then(() => console.log('on'))
    .then(() => writeFile(gpioDir + 'gpio' + pin + '/value', 1))
    .then(() => sleep(500))
    .then(() => writeFile(gpioDir + 'gpio' + pin + '/value', 0))
    .then(() => console.log('off'))
    .then(() => writeFile(gpioDir + 'unexport', pin))
    .catch((err) => {
      console.log(err);
      writeFile(gpioDir + 'unexport', pin);
    })
  ;
}

let start = Date.now();
console.log('start:');
let intervalId = setInterval(ledOnPromise, 1000, 500);
setTimeout(() => {
  clearInterval(intervalId);
  console.log(`end: ${Date.now() - start}`);
}, 5000);
