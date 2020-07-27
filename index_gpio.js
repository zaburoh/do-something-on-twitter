const tweet = require('./lib/twitter/tweet');
const raspberrypiStatus = require('./lib/util/raspberrypi_status');
const moment = require('moment');
const GPIO = require('./lib/gpio/gpio');
const gpio = new GPIO();

const Trig = 4;
const Twet17 = 17;
let message = '';

async function led(count, interval) {
  for(let i = 0; i < count; i++) {
    await gpio.sleep(interval);
    await gpio.output(Trig, gpio.OUTPUT.HIGH);
    await gpio.sleep(interval);
    await gpio.output(Trig, gpio.OUTPUT.LOW);  
  }
}

(async function() {

  process.once('SIGINT', async () => {
    try {
      await gpio.unexportPin(Trig);
      await gpio.unexportPin(Twet17);
    } catch(err) {
      console.log(err);
    }
    process.exit();
  });

  try {
    await gpio.setup(Trig, gpio.DIRECTION.OUT);
    await gpio.setup(Twet17, gpio.DIRECTION.IN);

    await gpio.input(Twet17, function(err, pin) {
      led(3, 100);
      message = moment().format('YYYY-MM-DD HH:mm:ss') + '\n\n' + pin + '番のスイッチが押されました。' + '\n\n';
      raspberrypiStatus.measure_temp(function(err, stdout) {
        message += 'RaspberryPiのCPU温度は ' + stdout + ' です。';
        tweet(message, function() {
          console.log('pushed: ' + pin);
        });    
      })
    });

  } catch(err) {
    console.log(err);
    await gpio.unexportPin(Trig);
    await gpio.unexportPin(Twet17);
  }
})();
