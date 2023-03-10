#!/usr/bin/env python3
"""Server class to paginate a database of popular baby names.
"""

import csv
import math
from typing import List, Tuple, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def index_range(self, page: int, page_size: int) -> Tuple:
        """gets start and end index"""
        end_index = page * page_size
        start_index = (end_index - page_size)

        return (start_index, end_index)

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        "gets values in a page"
        assert isinstance(page_size, int), "page_size ust be integer"
        assert isinstance(page, int), "page must be an integer"
        assert page > 0 and page_size > 0, "page and page_size are negative"

        dataset: List[List] = self.dataset()
        indexes: Tuple = self.index_range(page, page_size)

        try:
            return dataset[indexes[0]:indexes[1]]
        except IndexError:
            return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """hypermedia pagination"""
        data = self.get_page(page, page_size)
        tot_pages = math.ceil(len(self.__dataset) / page_size)
        next_page = page + 1 if page < tot_pages else None
        prev = page - 1 if page > 1 else None

        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev,
            'total_pages': tot_pages
        }
