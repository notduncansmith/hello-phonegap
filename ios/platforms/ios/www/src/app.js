var App = require('./react_app.jsx');

var app = {
  initialize: function () {
    this.bindEvents();
  },

  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function () {
    App();
  }
}

app.initialize()

// Manually start the app in desktop browsers
if (!window.orientation) {
  app.onDeviceReady();
}
