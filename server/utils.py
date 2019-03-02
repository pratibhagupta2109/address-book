"""A module for all common functions."""

def to_dict(address):
   """converts address type to dict object."""
   return {'email': address.email, 'name': address.name}
