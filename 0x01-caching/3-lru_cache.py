#!/usr/bin/env python3
"""BasicCache Module"""


BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """BasicCache Class"""

    def __init__(self) -> None:
        super().__init__()
        self._access_log = {}

    def key_exists(self, key: str) -> bool:
        """Checks if key exists"""
        try:
            k = self.cache_data[key]
            return True
        except KeyError:
            return False

    def put(self, key, item):
        """Adds an item to the cache_data"""
        if key is None or item is None:
            pass

        if not self.key_exists(key):
            self._access_log[key] = 1
            self.cache_data[key] = item

            if len(self.cache_data) > self.MAX_ITEMS:
                self.remove_least_frequent()
        else:
            self.cache_data[key] = item
            self._access_log[key] = 1

    def remove_least_frequent(self):
        """Removes the least frequent item of self.cache_data"""
        vals = list(self._access_log.values())
        vals.sort()
        keys = [k for k, v in self._access_log.items() if v == vals[0]]
        # print(f"keys: {keys}")
        # print(f"vals: {vals}")
        del self.cache_data[keys[0]]
        del self._access_log[keys[0]]
        print(F'DISCARD: {keys[0]}')

    def get(self, key):
        """
        Retrieves an item from cache_data dictionary
        """
        if key is None:
            return None
        try:
            item = self.cache_data.get(key)
            self._access_log[key] += 1
            return item
        except KeyError:
            return None
