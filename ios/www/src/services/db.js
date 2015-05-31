module.exports = function (Config) {
  var db = new PouchDB(Config.db.name);
  var remoteUrl = 'http://' + Config.db.host + ':' + Config.db.port + '/' + Config.db.name;

  console.log('Syncing with: ' + remoteUrl);

  db.sync(remoteUrl, {live: true, retry: true});
  return db;
}