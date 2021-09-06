import hashlib
import os

def generate_hash_and_salt(string):    
    salt=os.urandom(32).hex()
    key = hashlib.pbkdf2_hmac(
        'sha512', 
        string.encode('utf-8'),  
        bytes.fromhex(salt),
        100000).hex()
    return ({'key': key, 'salt': salt})

def generate_hash(string, salt):
    key = hashlib.pbkdf2_hmac(
        'sha512',
        string.encode('utf-8'),
        bytes.fromhex(salt),
        100000).hex()
    return key
