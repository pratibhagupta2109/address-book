import address_models as models
import unittest
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.ext import testbed

from address import Addresses
from address import InsertHandler
from address import UpdateHandler


class DatastoreTestCase(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        ndb.get_context().clear_cache()

    def tearDown(self):
        self.testbed.deactivate()

    def testInsertEntity(self):
        test_result = models.InsertAddress('test@email', 'test name')
        expected_result = {'name': 'test name', 'email': 'test@email'}
        self.assertEqual(test_result, expected_result)

    def testUpdateEntity(self):
        test_result = models.InsertAddress('test@email', 'test name')
        expected_result = {'name': 'test name', 'email': 'test@email'}
        self.assertEqual(test_result, expected_result)

    def testGetAddresses(self):
        address_list = models.AllAddresses()
        expected_result = {'name': 'test name', 'email': 'test@email'}
        self.assertEqual(test_result, expected_result)

if __name__ == '__main__':
    unittest.main()
