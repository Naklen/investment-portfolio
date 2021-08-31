#import asyncio
#import aiohttp
#import aiomoex
import apimoex
import requests
import json


def make_request(request_url, arguments):
    with requests.Session() as session:
        iss = apimoex.ISSClient(session, request_url, arguments)
        data = iss.get()         
        return data


stock_markets_url = 'https://iss.moex.com/iss/engines/stock/markets'

class Moex:
    def get_securities(market, board):
        request_url = f"{stock_markets_url}/{market}/boards/{board}/securities.json"
        arguments = {"securities.columns": (
            "SECID, " "SHORTNAME, " "SECNAME, " "LATNAME"), 'marketdata.columns': ('LAST, ' 'CHANGE,' 'LASTTOPREVPRICE')}
        data = make_request(request_url, arguments)
        result = []
        for s, m in zip(data['securities'], data['marketdata']):
            result.append({**s, **m})
        return result
    
    
    def get_changing_fields(market, board):
        request_url = f"{stock_markets_url}/{market}/boards/{board}/securities.json"
        arguments = {"securities.columns": (""), 'marketdata.columns': (
            'LAST, ' 'CHANGE,' 'LASTTOPREVPRICE')}
        return make_request(request_url, arguments)['marketdata']
    
    
    def get_security(market, board, secid):
        request_url = f"{stock_markets_url}/{market}/boards/{board}/securities/{secid}.json"
        data = make_request(request_url, {})        
        return {**data['securities'][0], **data['marketdata'][0]}
