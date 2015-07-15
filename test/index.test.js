var tap = require('tap')
  , spfIp = require('../')
  , exampleTxt = require('./files/example.json').txt
;

tap.ok(Array.isArray(spfIp().ips), 'it returns an array of ips');
tap.ok(~spfIp(exampleTxt).ips.indexOf('174.47.62.14'), 'it parses SPF records for ips');
tap.ok(spfIp().includes, 'it returns an array of includes');
tap.ok(~spfIp(exampleTxt).includes.indexOf('sid.silverpop.com'), 'it parses SPF records for includes');
