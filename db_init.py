from models import *

def init_db():
    with db:
        if not User.table_exists():
            User.create_table()
            print('users table created')
        
        if not Security.table_exists():
            Security.create_table()
            print('securities table created')
        
        if not UserSecurity.table_exists():
            UserSecurity.create_table()
            print('userSecurities table created')
        
        if not Transaction.table_exists():
            Transaction.create_table()
            print('transactions table created')            

if __name__ == '__main__':
    init_db()
