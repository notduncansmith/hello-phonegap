request = require 'request'
Promise = require 'bluebird'
qs = require 'qs'
_ = require 'lodash'

req = (opts) ->
  new Promise (resolve, reject) ->
    request opts, (err, resp, body) ->
      if err?
        reject err
      else
        resolve body

class Api
  constructor: (@base, @defaults) ->

  get: (path, params, opts) ->
    url = @base + path + qs.stringify(params)
    req _.extend({url, method: 'GET'}, @defaults, opts)

  post: (path, params, opts) ->
    url = @base + path
    req _.extend({url, method: 'POST', json: params}, @defaults, opts)

module.exports = Api