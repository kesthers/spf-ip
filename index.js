var cidr_range = require('cidr-range');

var spf_ip = function(list) {
  var regExp = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/[0-9]+|)\b/g;
  var results = {};
  results.ips = [].concat(list).map(function(string) {
    return ((string || '').match(regExp) || []).reduce(function(memo, ip) {
      var ips;
      if (!ip.match('/'))
       ips = ip; 
      else
        ips = cidr_range(ip);
      return memo.concat(ips);
    }, []);
  }).reduce(function(memo, list) {
    var result = [].concat(list).filter(function(ip) {
      return !~memo.indexOf(ip);
    });
    return memo.concat(result);
  }, []);
  results.includes = [].concat(list).map(function(string) {
    return ((string || '').match(/\b(?:include\:).+?(\s)/gi) || []).map(function(include) {
      return include.replace('include:', '').trim();
    });
  }).reduce(function(memo, list) {
    var result = [].concat(list).filter(function(ip) {
      return !~memo.indexOf(ip);
    });
    return memo.concat(result);
  }, []);
  return results;
}


module.exports = spf_ip;
