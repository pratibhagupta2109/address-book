import models
import logging
import webapp2
import json

def AsDict(address):
    return {'email': address.email, 'name': address.name}


class UpdateHandler(webapp2.RequestHandler):

    def post(self):
        logging.info('...........in UpdateHandler')
        r = json.loads(self.request.body)
        address = models.UpdateAddress(r['email'], r['name'])
        r = AsDict(address)
        self.response.headers['content-type'] = 'application/json'
        self.response.write(json.dumps(r))


class InsertHandler(webapp2.RequestHandler):

    def post(self):
        logging.info('...........in InsertHandler')
        logging.info(self.request.body)
        r = json.loads(self.request.body)
        logging.info('....................r: %s', r)
        existing = models.is_exists(r['email'])
        if existing:
            r = AsDict(existing)
            r.update({'status': 'exists'})
        else:
            address = models.InsertAddress(email=r['email'], name=r['name'])
            r = AsDict(address)
            r.update({'status': 'added'})
        self.response.headers['content-type'] = 'application/json'
        self.response.write(json.dumps(r))



class DeleteHandler(webapp2.RequestHandler):

    def post(self):
        r = json.loads(self.request.body)
        models.DeleteAddress(r['id'])