module.exports = function () {
  var di = require('omni-di')();
  var React = require('react');
  var Router = require('react-router');

  require('react-tap-event-plugin')();
  React.initializeTouchEvents(true);

  // Dependencies
  register('React', React);
  register('Bootstrap', require('react-bootstrap'));
  register('UI', require('material-ui'));
  window.Promise = require('bluebird');
  window.$ = require('jQuery');

  register('Router', Router);
  register('Route', Router.Route);
  register('Link', Router.Link);
  register('DefaultRoute', Router.DefaultRoute);
  register('RouteHandler', Router.RouteHandler);


  // Services
  both('Alert', require('./services/alert'));
  both('Config', require('./services/configure'));
  both('Api', require('./services/api.js'));
  both('Auth', require('./services/auth.js'));
  both('DB', require('./services/db'));
  both('Data', require('./services/data.js'));

  // Components
  both('DraggableNav', require('./components/layout/draggable_nav.jsx'));
  both('Menu', require('./components/layout/menu.jsx'));
  both('Header', require('./components/layout/header.jsx'));
  both('Layout', require('./components/layout/layout.jsx'));

  both('Home', require('./components/home.jsx'));
  both('Notification', require('./components/notification.jsx'));
  both('Notifications', require('./components/notifications.jsx'));

  // Set up routes and mount app
  inject(require('./bootstrap'))
  .then(function () {
    inject(require('./routes'));
  })


  function register (name, thing) {
    return di.register(name, thing);
  }

  function inject (thing) {
    return di.inject(thing);
  }

  function both (name, thing) {
    return di.injectAndRegister(name, thing);
  }
};