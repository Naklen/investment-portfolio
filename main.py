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
        User.create(name=name, password_hash=generate_hash(password))

@eel.expose
def try_log_in_user(name, password = ''):
    with db:        
        try:
            logging_user = User.get(User.name == name)
        except DoesNotExist:
            return {'error': 'user does not exist'}
        else:
            if logging_user.password_hash == '' or logging_user.password_hash == generate_hash(password):                
                return model_to_dict(logging_user)
            else:
                return {'error': 'password dont match'}

@eel.expose
def get_user_securities(user_id):
    with db:
        user_securities = (UserSecurity.select(UserSecurity, User, Security)
                           .join(User, on=(UserSecurity.user == User.id))
                           .join(Security, on=(UserSecurity.security == Security.id))
                           .where(User.id == user_id))
        result = []
        for security in user_securities:
            result.append(model_to_dict(security))
        return result

@eel.expose
def get_required_securities_list(market, board, required_securities):
    return Moex.get_required_securities(market, board, required_securities)


def main(develop):
    with db:
        if len(User) == 0:
            User(name='User', password_hash='').save()

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





