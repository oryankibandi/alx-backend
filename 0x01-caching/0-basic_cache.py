#!/usr/bin/env python3
"""BasicCache Module"""


BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """BasicCache Class"""

    def __init__(self) -> None:
        super().__init__()

    def put(self, key, item):
        """Adds an item to the cache_data"""
        if key is None or item is None:
            pass
        self.cache_data[key] = item

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
