const fs = require('fs').promises;

const DIRECTION = {
  IN: 'in',
  OUT: 'out'
};
const OUTPUT = {
  HIGH: 1,
  LOW: 0
};

// default pullup
// ON と OFF の値を逆にすればpull down
const SWITCH = {
  ON: '0\n',
  OFF: '1\n'
}

class GPIO {
  constructor() {
    this.gpioDir = '/sys/class/gpio/';
    this.DIRECTION = DIRECTION;
    this.OUTPUT = OUTPUT;
    this.SWITCH = SWITCH;
  }

  sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  async setup(pin, direction) {
    if(pin === undefined || direction === undefined) return console.log('invalid parameter.');
    try {
      await this.exportPin(pin);
      // export してから少し待たないと'/sys/class/gpio/gpio{N}/directionの'グループがgpioになっておらずpermission denied.となる
      await this.sleep(100);
      await this.setDirection(pin, direction);
    } catch(err) {
      if(err.code === 'EBUSY') return console.log(`${pin} is already connected.`);
      console.log(err);
    }
  }

  async exportPin(pin) {
    console.log('[export]' + pin);
    if(typeof pin !== 'string') pin += '';
    await fs.writeFile(this.gpioDir + 'export', pin);
  }

  async unexportPin(pin) {
    console.log('[unexport] ' + pin );
    if(typeof pin !== 'string') pin += '';
    await fs.writeFile(this.gpioDir + 'unexport', pin);
  }

  async setDirection(pin, direction) {
    console.log('[direction]' + pin + ' : ' + direction);
    await fs.writeFile(this.gpioDir + 'gpio' + pin + '/direction', direction);
  }

  async output(pin, value) {
    if(typeof value !== 'string') value += '';
    console.log('[output]' + pin + ' : ' + value);

    try {
      await fs.writeFile(this.gpioDir + 'gpio' + pin + '/value', value);
    } catch(err) {
      return console.log(err);
    }
  }

  // pullup only
  async input(pin, callback) { 
    console.log('[input]' + pin);
    if(typeof callback !== 'function') return console.log('parameter callback not function');
    let preResult = 1;
    let curResult = 1;

    while(true) {
      preResult = curResult;
      try {
        curResult = await fs.readFile(this.gpioDir + 'gpio' + pin + '/value', 'utf8');
      } catch(err) {
        if(err.code === 'ENOENT') return console.log(`${pin} is already file closed.`);
      }
  
      if(curResult === this.SWITCH.ON && preResult === this.SWITCH.OFF) callback(null, pin);
    }
  }
}

module.exports = GPIO;