#import asyncio
#import aiohttp
#import aiomoex
import apimoex
import requests
import pandas as pd


def get_securities():
    request_url = "https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json"
    arguments = {"securities.columns": ("SECID," "SHORTNAME, " "PREVPRICE")}

    with requests.Session() as session:
        iss = apimoex.ISSClient(session, request_url, arguments)
        data = iss.get()
        #await asyncio.sleep(10)
        df = pd.DataFrame(data["securities"])
        df.set_index("SECID", inplace=True)
        # print(df.head(), "\n")
        # print(df.tail(), "\n")
        # df.info()    
    return df
