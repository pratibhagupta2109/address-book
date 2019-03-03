"""A module to handle get requests for Address entity."""

import json
import address_models as models
import logging
import utils
import webapp2


HEADERS = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}


class Addresses(webapp2.RequestHandler):
    """Get entities for addresses."""
    def get(self):
        addresses = models.AllAddresses()
        r = [utils.to_dict(address) for address in addresses]
        self.response.headers['content-type'] = 'application/json'
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        self.response.write(json.dumps(r))


class UpdateHandler(webapp2.RequestHandler):
    """Handler to update address entity."""
    def post(self):
        logging.debug('...........in UpdateHandler')
        r = json.loads(self.request.body)
        address = models.UpdateAddress(r['email'], r['name'])
        r = utils.to_dict(address)
        self.response.headers = HEADERS
        self.response.write(json.dumps(r))


class InsertHandler(webapp2.RequestHandler):
    """Handler to insert address entity."""
    def post(self):
        logging.info('...........in InsertHandler')
        logging.info(self.request.body)
        r = json.loads(self.request.body)
        logging.info('....................r: %s', r)
        existing = models.is_exists(r['email'])
        if existing:
            r = utils.to_dict(existing)
            r.update({'status': 'exists'})
        else:
            address = models.InsertAddress(email=r['email'], name=r['name'])
            r = utils.to_dict(address)
            r.update({'status': 'added'})
        self.response.headers['content-type'] = 'application/json'
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        # self.response.headers = HEADERS
        self.response.write(json.dumps(r))
