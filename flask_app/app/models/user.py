from passlib.apps import custom_app_context as pwd_context
from .. import db


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    # Additional fields
    email = db.Column(db.String)
    username = db.Column(db.String)
    name = db.Column(db.String)
    password_hash = db.Column(db.String(128))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def __repr__(self):
        return 'User {}>'.format(self.id)
