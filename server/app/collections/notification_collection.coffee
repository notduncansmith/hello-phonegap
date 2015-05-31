module.exports = (app) ->
  app.collection
    name: 'Notification'
    restful: true
    fields:
      userId: 'string'
      title: 'string'
      body: 'string'
      data: 'object'
    views:
      byUserId:
        map: (doc) ->
          if (doc.type is '{{name}}') and doc.userId?
            emit doc.userId, doc._id