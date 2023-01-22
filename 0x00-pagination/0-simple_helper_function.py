#!/usr/bin/env python3
"""gets start and end index"""


import typing


def index_range(page: int, page_size: int) -> typing.Tuple:
    """gets start and end index"""
    end_index = page * page_size
    start_index = (end_index - page_size)

    return (start_index, end_index)
