Summit = require 'summit'

module.exports = (app) ->
  router = app.router()

  router.get '/', (req) ->
    if req.params.name
      Summit.text "Hello, #{req.params.name}"
    else
      Summit.text 'Hello!'