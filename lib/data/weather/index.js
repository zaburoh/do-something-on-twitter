const request = require('request');

const url = 'https://www.data.jma.go.jp/obd/stats/data/mdrr/tem_rct/alltable/mxtemsadext00_rct.csv';

request.get(url, function(err, res, body) {
  if(err) console.log(err);
  console.log(res);
  console.log('==========');
  // console.log(body);
})