import eel
import asyncio
import sys
import platform
from datetime import datetime
from moex import Moex
from models import *
from playhouse.shortcuts import model_to_dict
from hashgen import *

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
def get_required_securities_list(market, board, required_securities):
    return Moex.get_required_securities(market, board, required_securities)

@eel.expose
def try_create_user(name, password):
    with db:
        try:
            hash_pair = generate_hash_and_salt(password)
            new_user = User.create(name=name, password_hash=hash_pair['key'], salt=hash_pair['salt'])
        except IntegrityError:
            return {'error': 'user already exist'}
        else:
            return model_to_dict(new_user)

@eel.expose
def try_log_in_user(name, password = ''):
    with db:        
        try:
            logging_user = User.get(User.name == name)
        except DoesNotExist:
            return {'error': 'user does not exist'}
        else:            
            if logging_user.password_hash == '' or logging_user.password_hash == generate_hash(password, logging_user.salt):
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
def get_user_security_count(user_id, secid):
    with db:
        user = User.get(User.id == user_id)    
        try:
            security = Security.get(Security.secid == secid.lower())
        except DoesNotExist:            
            return 0
        else:            
            try:
                user_security = UserSecurity.get(UserSecurity.user == user, UserSecurity.security == security)
            except DoesNotExist:                
                return 0
            else:                
                return user_security.count


@eel.expose
def add_or_delete_security_to_user(user_id, security_params, is_buy, datetime):    
    with db:
        user = User.get(User.id == user_id)
        security = Security.get_or_create(
            secid=security_params['secid'].lower(),
            defaults={'market': security_params['market'], 'board': security_params['board']})[0]
        user_security = UserSecurity.get_or_create(
            user=user.id,
            security=security.id,
            defaults={'count': 0}
        )[0]
        if is_buy:
            user_security.count += security_params['count']
        else:
            user_security.count -= security_params['count']
        user_security.save()
        if user_security.count == 0:
            UserSecurity.delete().where(UserSecurity.id == user_security.id).execute()
        if security_params['price'] is None:
            price = 0
        else:
            price = security_params['price']
        Transaction.create(
            user=user,
            security=security,
            is_buy=is_buy,
            datetime=datetime,
            price=price,
            security_count=security_params['count']
        )

@eel.expose
def try_edit_user_name(user_id, new_name):
    with db:
        if new_name == '':
            return {'error': 'empty string'}
        user = User.get(User.id == user_id)
        try:
            user.name = new_name
            user.save()
        except IntegrityError:
            return {'error': 'user already exist'}
        else:
            return model_to_dict(user)


@eel.expose
def try_edit_user_password(user_id, prev_password, new_password):
    with db:
        user = User.get(User.id == user_id)
        new_hash_pair = generate_hash_and_salt(new_password)
        if generate_hash(prev_password, user.salt) != user.password_hash:
            return {'error': 'wrong password'}
        else:
            user.password_hash = new_hash_pair['key']
            user.salt = new_hash_pair['salt']
            user.save()
            return model_to_dict(user)

@eel.expose
def get_user_transactions_history(user_id):
    with db:
        transactions = (Transaction.select(Transaction, User, Security)
                           .join(User, on=(Transaction.user == User.id))
                           .join(Security, on=(Transaction.security == Security.id))
                           .where(User.id == user_id)
                           .order_by(Transaction.datetime.desc()))
        result = []
        for transaction in transactions:
            result.append(model_to_dict(transaction))
        return result

@eel.expose
def delete_transaction(transaction_id):
    with db:
        Transaction.delete().where(Transaction.id == transaction_id).execute()

@eel.expose
def delete_all_transactions(user_id):
    with db:
        Transaction.delete().where(Transaction.user == user_id).execute()


def main(develop):
    with db:
        if len(User) == 0:
            try_create_user('User', '')            

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





