import eel
import asyncio
import sys
import platform
from datetime import datetime
from moex import Moex
from models import *
from playhouse.shortcuts import model_to_dict
from hashgen import generate_hash

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
        User.create(name=name, password_hash=password, is_logged_in=False)

@eel.expose
def get_logged_in_user():    
    with db:       
        return model_to_dict(User.get(User.is_logged_in == True))

@eel.expose
def try_log_in_user(name, password = ''):
    with db:
        prev_user = User.get(User.is_logged_in == True)
        try:
            logging_user = User.get(User.name == name)
        except DoesNotExist:
            return 2
        else:
            if logging_user.password_hash == '' or logging_user.password_hash == generate_hash(password):
                prev_user.is_logged_in = False
                prev_user.save()
                logging_user.is_logged_in = True
                logging_user.save()
                return 0
            else:
                return 1







def main(develop):
    with db:
        if len(User) == 0:
            User(name='User', password_hash='', is_logged_in=True).save()

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





