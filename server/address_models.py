from google.appengine.ext import ndb


class Address(ndb.Model):
    """A model for Address entity."""
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    last_updated = ndb.DateTimeProperty(auto_now=True)


def AllAddresses():
    """Returns all addresses order by latest added first."""
    return Address.query().order(-Address.last_updated)


def UpdateAddress(email, name):
    """Updates Address details, returns updated address."""
    address = Address(id=email, name=name, email=email)
    address.put()
    return address


def InsertAddress(email, name):
    """Insert Address details, returns back address."""
    address = Address(id=email, email=email, name=name)
    address.put()
    return address

def is_exists(id):
    """Checks if an address exists."""
    return Address.get_by_id(id)


def DeleteAddress(email):
    """Deletes an address entity."""
    # TODO (pratibha): not in use as of now.
    key = ndb.Key(Address, email)
    key.delete()
