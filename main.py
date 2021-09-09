import eel
import asyncio
import sys
import platform
from models import *
from exposed_functions import *

sys.path.insert(1, '../../')


def main(develop):
    with db:
        if not User.table_exists():
            User.create_table()    

        if not Security.table_exists():
            Security.create_table()   

        if not UserSecurity.table_exists():
            UserSecurity.create_table()

        if not Transaction.table_exists():
            Transaction.create_table()
        if len(User) == 0:
            try_create_user('Admin', 'admin')
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
    main(len(sys.argv) == 2)





