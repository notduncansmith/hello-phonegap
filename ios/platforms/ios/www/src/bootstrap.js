function bootstrap (Auth, Data) {
  // Auth.register currently mocked,
  // only calling it to get a user
  // set on Auth.

  return Auth.register()
  .then(function () {

    registerPush(Data);

    return Data.addSavedSearch('cheap', function (doc) {
      var price;

      if (doc.type === 'Item' && doc.priceBid) {
        price = doc.priceBid.replace('$', '');
        return (parseInt(price, 10) <= 100);
      }

      return false;
    });
  });
}

function registerPush (Data) {
  var opts = {googleProjectNumber: "", autoRegister: true};
  var appId = "39a74d08-fc0f-11e4-9a02-eb51aa8e1c07";

  if (!window.plugins) {
    window.plugins = {
      OneSignal: {init: function(){}, getIds: function(){}}
    };
  }

  window.plugins.OneSignal.init(appId, opts, function (results) {
    alert(JSON.stringify(results));
  });

  window.plugins.OneSignal.getIds(function (ids) {
    console.log('Got push token: ', ids.userId)
    Data.newUserDevice(ids.userId)
    .then(function (result) {
      console.log('Device registered: ' + JSON.stringify(result));
    });
  });
}

module.exports = bootstrap;