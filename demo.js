
var CronJob = require('cron').CronJob;
var client=require("./client");
new CronJob('* * */2 * * *', function() {
  client();
}, null, true, 'America/Los_Angeles');

