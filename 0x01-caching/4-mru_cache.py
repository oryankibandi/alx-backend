#!/usr/bin/env python3
"""BasicCache Module"""


BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """MRUCache Class"""

    def __init__(self) -> None:
        super().__init__()
        self._most_recent = None

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
                self.remove_most_recent()

        self.cache_data[key] = item
        self._most_recent = key

    def remove_most_recent(self):
        """Removes the last item of self.cache_data"""
        key = self._most_recent
        del self.cache_data[key]
        print(f"DISCARD: {key}")

    def get(self, key):
        """
        Retrieves an item from cache_data dictionary
        """
        if key is None:
            return None
        try:
            v = self.cache_data.get(key)
            self._most_recent = key
            return v
        except KeyError:
            return None
