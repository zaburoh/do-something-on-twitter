const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

function ReadSwitch() {
  this.gpioDir = '/sys/class/gpio/';
}

ReadSwitch.prototype.exportPin = function(pin) {
  let emitter = new EventEmitter();
  fs.writeFile(this.gpioDir + 'export', pin, (err) => {
    if(err) return emitter.emit('error', err);
    return emitter.emit('success', pin);
  });
  return emitter;
}

ReadSwitch.prototype.unexportPin = function(pin) {
  let emitter = new EventEmitter();
  fs.writeFile(this.gpioDir + 'unexport', pin, (err) => {
    if(err) return emitter.emit('error', err);
    return emitter.emit('success', pin);
  });
  return emitter;
}

ReadSwitch.prototype.setDirectionPin = function(pin, direction) {
  let emitter = new EventEmitter();
  fs.writeFile(this.gpioDir + 'gpio' + pin + '/direction', direction, (err) => {
    if(err) return emitter.emit('error', err);
    return emitter.emit('success', { pin, direction });
  });
  return emitter;
}

ReadSwitch.prototype.readPin = function(pin, callback) {
  fs.readFile(this.gpioDir + 'gpio' + pin + '/value', 'utf8', (err, data) => {
    if(err) return callback(err, pin);
    if(data === '0\n') {
      return callback(null, true)
    } else {
      return callback(null, false)
    }
  });
}

module.exports = ReadSwitch;
