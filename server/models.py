from google.appengine.ext import ndb


class Address(ndb.Model):
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    last_updated = ndb.DateTimeProperty(auto_now=True)


def AllAddresses():
    return Address.query().order(-Address.last_updated)


def UpdateAddress(email, name):
    address = Address(id=email, name=name, email=email)
    address.put()
    return address


def InsertAddress(email, name):
    address = Address(id=email, email=email, name=name)
    address.put()
    return address

def is_exists(id):
    return Address.get_by_id(id)


def DeleteAddress(email):
    key = ndb.Key(Address, email)
    key.delete()