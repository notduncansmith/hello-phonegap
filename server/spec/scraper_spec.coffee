Scraper = require '../scraper'
Promise = require('summit').Promise

fakeRq =
  get: (url, fn) -> 
    # Note: contents of body don't matter 
    # because we override the parser
    timeback = -> fn null, [{body: 'foo'}]
    setTimeout timeback, 1

class FakeScraper extends Scraper
  constructor: (rq) ->
    super(rq)
    @base = 'http://foo.com'
    @scrapePath = '/bar'

  parse: -> {totalPages: 3, items: ['foo', 'bar']}

s = new FakeScraper(fakeRq)

describe 'Scraper', ->
  
  describe '#get', ->
    it 'returns a promise', ->
      expect s.get()
      .toEqual jasmine.any(Promise)

    it 'sends a GET request to the url', ->
      target = '/foo'
      spyOn fakeRq, 'getAsync'
      .andCallThrough()

      s.get target
      expect fakeRq.getAsync
      .toHaveBeenCalledWith(s.base + target)

    it 'parses the body of the response', (done) ->
      s.get 'foo'
      .then (results) ->
        expect results
        .toEqual {totalPages: 3, items: ['foo', 'bar']}
        done()

  describe '#getPage', ->
    it 'gets the specified page for the passed number', ->
      spyOn fakeRq, 'getAsync'
      .andCallThrough()

      s.getPage 3

      expect fakeRq.getAsync
      .toHaveBeenCalledWith "#{s.base}/page/3/bar"

  describe '#getAll', ->
    it 'gets all pages', (done) ->
      s.getAll()
      .then (results) ->
        expect results
        .toEqual [ 'foo', 'bar', 'foo', 'bar', 'foo', 'bar' ]

        done()

