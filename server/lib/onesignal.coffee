mustache = require 'mustache'

module.exports = (Api, config) ->
  OneSignal = new Api('https://onesignal.com/api/v1')

  OneSignal.push = (content, payload, user) ->
    payload = payload || {}
    title = mustache.render content.title, payload
    body = mustache.render content.body, payload

    msg =
      headings: {en: title}
      contents: {en: body}
      isIos: true
      data: payload
      include_player_ids: [user]

    msg.app_id = config.oneSignal.appId
    console.log 'POSTING MSG: ', msg
    @post '/notifications', msg

  OneSignal.push.bind(OneSignal)