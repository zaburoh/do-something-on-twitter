const { CronJob } = require('cron');
let app = require('./periodic_execution');

new CronJob('00 15 * * * *', () => {
  app.post();
}, null, true);