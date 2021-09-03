from peewee import *

db_path = './database.db'

db = SqliteDatabase(db_path)


class BaseModel(Model):
    id = AutoField(unique=True)

    class Meta:
        database = db
        order_by = id

class User(BaseModel):    
    name = CharField()
    password = CharField()

    class Meta:
        db_table = 'users'

class Security(BaseModel):
    secid = CharField()
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
    datetime = DateTimeField()
    security_count = IntegerField()

    class Meta:
        db_table = 'transactions'
