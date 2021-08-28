#import asyncio
#import aiohttp
#import aiomoex
import apimoex
import requests
import pandas as pd
import json


def make_request(request_url, arguments):
    with requests.Session() as session:
        iss = apimoex.ISSClient(session, request_url, arguments)
        data = iss.get()         
        return data

def get_securities(market, board):
    request_url = f"https://iss.moex.com/iss/engines/stock/markets/{market}/boards/{board}/securities.json"
    arguments = {"securities.columns": (
        "SECID," "SHORTNAME"), 'marketdata.columns': ('LAST, ' 'CHANGE,' 'LASTTOPREVPRICE')}

    data = make_request(request_url, arguments)
    res = []
    for s, m in zip(data['securities'], data['marketdata']):
        res.append({**s, **m})
    return res

def get_changing_fields(market, board):
    request_url = f"https://iss.moex.com/iss/engines/stock/markets/{market}/boards/{board}/securities.json"
    arguments = {"securities.columns": (""), 'marketdata.columns': ('LAST, ' 'CHANGE,' 'LASTTOPREVPRICE')}

    return make_request(request_url, arguments)['marketdata']
