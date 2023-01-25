#!/usr/bin/env python3
"""BasicCache Module"""


BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """BasicCache Class"""

    def __init__(self) -> None:
        super().__init__()

    def put(self, key, item):
        """Adds an item to the cache_data"""
        if key is None or item is None:
            pass
        self.cache_data[key] = item

        if len(self.cache_data) > self.MAX_ITEMS:
            self.remove_first()

    def remove_first(self):
        """Removes the first item of self.cache_data"""
        key = list(self.cache_data.keys())[0]
        del self.cache_data[key]
        print(f"DISCARD: {key}")

    def get(self, key):
        """
        Retrieves an item from cache_data dictionary
        """
        if key is None:
            return None
        try:
            return self.cache_data.get(key)
        except KeyError:
            return None
