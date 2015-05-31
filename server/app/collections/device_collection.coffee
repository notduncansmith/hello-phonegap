module.exports = (app) ->
  app.collection
    name: 'Device'
    restful: true
    fields:
      userId: 'string'
      pushToken: 'string'
    views:
      byUserId:
        map: (doc) ->
          if (doc.type is '{{name}}') and doc.userId?
            emit doc.userId, doc._id
    methods:
      byUserId: (id) -> @view 'byUserId', {key: id}, {include_docs: true}