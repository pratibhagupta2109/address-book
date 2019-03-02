import json
import logging
import models
import webapp2

from address import Addresses
from address import UpdateHandler
from address import InsertHandler


app = webapp2.WSGIApplication([
    ('/server/query.*', Addresses),
    ('/server/insert.*', InsertHandler),
    ('/server/update.*', UpdateHandler),
], debug=True)
