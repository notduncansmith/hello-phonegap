var _ = require('lodash');

module.exports = function (React, Notification, Data) {
  var Notifications = React.createClass({
    getInitialState: function () {
      var self = this;

      Data.notifications().on('change', function (ch) {
        var doc = ch.doc;
        if (!doc) { return; }
        if (doc.type === 'Notification') {
          Data.allNotifications().then(function (ns) {
            self.setNotifications(ns);
          });
        }
      });

      Data.allNotifications().then(function (ns) {
        self.setNotifications(ns);
      });

      return {notifications: []};
    },

    setNotifications: function (notifications) {
      this.setState({notifications: notifications});
    },

    render: function () {
      var notifications = _.map(this.state.notifications, function (n) {
        return <Notification {...n} key={n._id} />;
      });

      return <div className='item-list'>{notifications}</div>;
    }
  });

  return Notifications;
};