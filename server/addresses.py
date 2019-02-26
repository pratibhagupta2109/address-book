import json
import webapp2
import logging
import models

def to_dict(address):
    return {'email': address.email, 'name': address.name}

class Addresses(webapp2.RequestHandler):

    def get(self):
        logging.info('..................In Addresses')
        addresses = models.AllAddresses()
        r = [to_dict(address) for address in addresses]
        self.response.headers['content-type'] = 'application/json'
        self.response.write(json.dumps(r))