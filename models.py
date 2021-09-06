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
    salt = CharField()    

    class Meta:
        db_table = 'users'

class Security(BaseModel):
    secid = CharField(unique=True)
    market = CharField()
    board = CharField()

    class Meta:
        db_table = 'securities'

class UserSecurity(BaseModel):
    user = ForeignKeyField(User)
    security = ForeignKeyField(Security)
    count = IntegerField()

    class Meta:
        db_table = 'userSecurities'

class Transaction(BaseModel):
    user = ForeignKeyField(User)
    security = ForeignKeyField(Security)
    is_buy = BooleanField()
    datetime = CharField()
    price = FloatField()
    security_count = IntegerField()

    class Meta:
        db_table = 'transactions'
