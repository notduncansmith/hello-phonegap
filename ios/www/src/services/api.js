module.exports = function (Config) {
  var Api = {
    login: function (creds) {
      // HTTP request
      return Promise.resolve(true);
    },

    register: function (user) {
      // HTTP request
      return Promise.resolve({
        username: 'notduncansmith',
        _id: 'notduncansmith'
      });
    },

    search: function (term) {
      // HTTP request
      return results;
    }
  };

  return Api;
};