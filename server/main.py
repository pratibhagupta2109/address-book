import json
import webapp2
import models
import logging
from update_address import UpdateHandler
from update_address import InsertHandler
from addresses import Addresses

def AsDict(guest):
    return {'id': guest.key.id(), 'first': guest.first, 'last': guest.last}


class RestHandler(webapp2.RequestHandler):

    def dispatch(self):
        # time.sleep(1)
        super(RestHandler, self).dispatch()

    def SendJson(self, r):
        self.response.headers['content-type'] = 'text/plain'
        self.response.write(json.dumps(r))

class TestRestHandler(webapp2.RequestHandler):
    def get(self):
        logging.info('Hello test app is called......')
        self.response.headers['content-type'] = 'text/plain'
        self.response.write(json.dumps({'message': 'hello pratibha'}))

# class QueryHandler(RestHandler):

#     def get(self):
#         guests = model.AllGuests()
#         r = [AsDict(guest) for guest in guests]
#         self.SendJson(r)


# class UpdateHandler(RestHandler):

#     def post(self):
#         r = json.loads(self.request.body)
#         guest = model.UpdateGuest(r['id'], r['first'], r['last'])
#         r = AsDict(guest)
#         self.SendJson(r)


# class InsertHandler(RestHandler):

#     def post(self):
#         logging.info('.............^^^^^^ in InsertHandler')
#         r = json.loads(self.request.body)
#         guest = models.InsertAddress(r['email'], r['name'])
#         r = AsDict(guest)
#         self.SendJson(r)


# class DeleteHandler(RestHandler):

#     def post(self):
#         r = json.loads(self.request.body)
#         model.DeleteGuest(r['id'])


app = webapp2.WSGIApplication([
    ('/server/query.*', Addresses),
    ('/server/insert.*', InsertHandler),
    # ('/server/delete', DeleteHandler),
    ('/server/update.*', UpdateHandler),
    ('/server/test', TestRestHandler),
], debug=True)