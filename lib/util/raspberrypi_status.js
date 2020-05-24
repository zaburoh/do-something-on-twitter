const exec = require('child_process').exec;

module.exports = {
  measure_temp: function(callback) {
    exec('vcgencmd measure_temp', (err, stdout, stderr) => {
      if (err) return callback(err);
      callback(null, stdout);
    });
  }
}
