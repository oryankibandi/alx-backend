#!/usr/bin/env python3
"""BasicCache Module"""


BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """BasicCache Class"""

    def __init__(self) -> None:
        super().__init__()
        self._last_in = None

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
            if len(self.cache_data) >= self.MAX_ITEMS:
                self.remove_last()

        self.cache_data[key] = item
        self._last_in = key

    def remove_last(self):
        """Removes the last item of self.cache_data"""
        key = self._last_in
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
