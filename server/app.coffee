Summit = require 'summit'
config =
  environment:
    url: 'http://localhost:8080'
  db:
    name: 'cordova'
    enableCORS: true
  oneSignal:
    appId: '39a74d08-fc0f-11e4-9a02-eb51aa8e1c07'

app = new Summit(config)
Promise = Summit.Promise

require('./app/collections/device_collection')(app)
require('./app/collections/notification_collection')(app)

app.inject 'Api', require('./lib/api')
app.inject 'Push', app.invoke(require('./lib/onesignal'))

app.invoke require('./app/workers/notification_worker')

app.invoke require('./app/routers/home_router')
app.invoke require('./app/routers/push_router')

app.start()