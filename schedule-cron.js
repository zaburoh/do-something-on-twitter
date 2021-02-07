const { CronJob } = require('cron');
let app = require('./periodic_execution');

new CronJob('00 15 * * * *', () => {
  app.trendTweet();
}, null, true);

new CronJob('00 45 * * * *', () => {
  app.isbnTweet();
}, null, true);