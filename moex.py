#import asyncio
#import aiohttp
#import aiomoex
import apimoex
import requests
import pandas as pd
import json


def get_securities(market, board):
    request_url = f"https://iss.moex.com/iss/engines/stock/markets/{market}/boards/{board}/securities.json"
    arguments = {"securities.columns": (
        "SECID," "SHORTNAME, " "PREVPRICE"), 'marketdata.columns': ('LAST, ' 'CHANGE,' 'LASTTOPREVPRICE')}

    with requests.Session() as session:
        iss = apimoex.ISSClient(session, request_url, arguments)
        data = iss.get()        
        res = []
        for s, m in zip(data['securities'], data['marketdata']):
            res.append({**s, **m})
        return res
