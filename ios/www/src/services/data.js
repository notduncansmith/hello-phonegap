module.exports = function (DB, Api, Auth) {
  var Data = {
    newUserDevice: function (token) {
      var userId = Auth.user._id;

      var device = {
        _id: [userId, 'push', token].join(':'),
        type: 'Device',
        userId: userId,
        pushToken: token
      };

      console.log('Registering device: ' + JSON.stringify(device));
      console.log('Registering token: ' + token);

      return DB.put(device);
    },

    notifications: function () {
      return DB.changes({
        since: 0,
        include_docs: true,
        live: true,
        filter: 'Notifications/byUserId'
      });
    },

    allNotifications: function () {
      return DB.query('Notification/byUserId', {key: Auth.user._id, include_docs: true})
      .then(function (result) {
        return result.rows.map(function (row) { return row.doc; });
      });
    }
  };

  // For mucking around in DevTools
  window.Data = Data;

  function nameForSearch (search) {
    return ['Search', Auth.user.username, search].join('.');
  }

  function filterForSearch (search) {
    return nameForSearch(search) + '/' + search;
  }

  return Data;
};