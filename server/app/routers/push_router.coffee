Summit = require 'summit'

module.exports = (app) ->
  router = app.router()

  router.get '/push/:id', (req, Notification) ->
    Notification.put {userId: req.params.id, title: 'Hello', body: 'Test!', data: {}}
    .then Summit.json

  router.get '/user/:id/devices', (req, Device) ->
    Device.byUserId req.params.id
    .then Summit.json