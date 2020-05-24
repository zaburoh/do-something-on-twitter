const tweet = require('./lib/twitter/tweet');
const ReadSwitch = require('./lib/gpio/read_switch');
const DateUtil = require('./lib/util/date_util');

let readSwitch = new ReadSwitch();
let pin = 17;
let direction = 'in';

readSwitch.exportPin(pin)
  .on('error', err => {
    console.log('[exportError]' + err);
    readSwitch.unexportPin(pin);
  })
  .on('success', pin => {
    console.log('[exportPin]' + pin)
    readSwitch.setDirectionPin(pin, direction)
      .on('error', err => {
        console.log('[directionError]' + err);
        readSwitch.unexportPin(pin);
      })
      .on('success', set => {
        console.log('[directionPin]' + set.pin + ':' + set.direction);

        function iterate() {
          readSwitch.readPin(pin, (err, state) => {
            if(err) {
              readSwitch.unexportPin(pin);
              return console.log('[READ ERROR]' + err);
            }
            if(state) {
              console.log('[pushed]' + pin);
              tweet(new DateUtil().formatedDate() + '\n\n' + pin + '番のスイッチが押されました。' + '\n\n' + '#RaspberryPi4', function() {
                iterate();
              })
            } else {
              iterate();
            }
          });
        }
        iterate();
      });
  });

