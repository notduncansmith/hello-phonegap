function pgAlert (text) {
  return window.navigator.notification.alert(text, function () {
    console.log('Got stuff!!!!');
  }, 'Frillfeed', 'Okay');
}

module.exports = function () {
  return function (text) {
    if (window.navigator && window.navigator.notification) {
      return pgAlert(text);
    }

    return alert(text);
  }
};