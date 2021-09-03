from peewee import *

db_path = './database.db'

db = SqliteDatabase(db_path)


class BaseModel(Model):
    id = AutoField(unique=True)

    class Meta:
        database = db
        order_by = id

class User(BaseModel):    
    name = CharField(unique=True)
    password_hash = CharField()
    is_logged_in = BooleanField()

    class Meta:
        db_table = 'users'

class Security(BaseModel):
    secid = CharField(unique=True)
    market = CharField()
    board = CharField()

    class Meta:
        db_table = 'securities'

class UserSecurity(BaseModel):
    user_id = ForeignKeyField(User)
    security_id = ForeignKeyField(Security)

    class Meta:
        db_table = 'userSecurities'

class Transaction(BaseModel):
    user_id = ForeignKeyField(User)
    security_id = ForeignKeyField(Security)
    is_buy = BooleanField()
    datetime = CharField()
    security_count = IntegerField()

    class Meta:
        db_table = 'transactions'
