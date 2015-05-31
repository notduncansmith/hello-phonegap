module.exports = function (Api) {
  var Auth = {
    login: function (creds) {
      return Api.login(creds);
    },

    register: function (creds) {
      var self = this;

      return Api.register(creds)
      .then(function (user) {
        self.user = user;
        return user;
      });
    }
  };

  return Auth;
};