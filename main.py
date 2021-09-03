import eel
import asyncio
import sys
import platform
from moex import Moex
from models import *

sys.path.insert(1, '../../')

@eel.expose
def get_securities_list(market, board):
    return Moex.get_securities(market, board)

@eel.expose
def get_securities_changing_fields_list(market, board):
    return Moex.get_changing_fields(market, board)

@eel.expose
def get_security_data(market, board, secid):
    return Moex.get_security(market, board, secid)

@eel.expose
def create_user(name, password):
    with db:
        User.create(name=name, password=password)        

@eel.expose
def get_all_users():
    with db:
        return User.select()




def main(develop):
    with db:
        if len(User) == 0:
            User(name='User', password='').save()

    if develop:
        print('DEVELOP MODE')
        directory = './web/src'       
        page = {'port': 3000}
    else:        
        directory = './web/build'        
        page = 'index.html'

    eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])    

    eel_kwargs = dict(
        host='localhost',
        port=8080,
        size=(1280, 800)
    )
    try:
        if develop:
            eel.start(page, app=None, **eel_kwargs)
        else:
            eel.start(page, **eel_kwargs)
    except EnvironmentError:
        print('ENV ERR')
        # If Chrome isn't found, fallback to Microsoft Edge on Win10 or greater
        if sys.platform in ['win32', 'win64'] and int(platform.release()) >= 10:
            eel.start(page, mode='edge', **eel_kwargs)
        else:
            raise

if __name__ == '__main__':
    main(develop=len(sys.argv) == 2)





