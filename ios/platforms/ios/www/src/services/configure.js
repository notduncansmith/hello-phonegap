var deviceConfig = require('../config/production_config');
var localConfig = require('../config/local_config');

module.exports = function () {
  var isPhonegap = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

  console.log('Page url: ' + document.URL);

  if (isPhonegap) {
    config = deviceConfig;
  }
  else {
    // we're in the browser
    config = localConfig;
  }

  console.log('Using config: ');
  console.log(JSON.stringify(config));

  return config;
};