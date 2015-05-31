var simulatorConfig = {
  db: {
    host: 'localhost',
    port: '5985',
    name: 'cordova'
  }
};

var productionConfig = {
  db: {
    host: '10.0.1.11',
    port: '5985',
    name: 'cordova'
  }
};

if (window.device && window.device.model && window.device.model === 'x86_64') {
  console.log('Using simulator config');
  module.exports = simulatorConfig;
}
else {
  console.log('Using production config');
  module.exports = productionConfig;
}