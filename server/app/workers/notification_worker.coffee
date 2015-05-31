Promise = require 'bluebird'

module.exports = (Notification, Device, Push) ->
  Notification.on 'put', ({data}) ->
    console.log 'Got notification'
    console.log data
    {userId, title, body, data} = data

    msg = {title, body}

    console.log "pushing ", msg
    Device.byUserId userId
    .tap console.log
    .then (results) -> Promise.resolve results.map((d) -> d.pushToken)
    .tap console.log
    .then (tokens) -> Promise.all tokens.map((token) -> Push msg, data, token)
    .then (results) ->
      console.log "Push results for user #{userId}", results