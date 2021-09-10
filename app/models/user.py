from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    #columns
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String, nullable= False, unique= True)
    email = db.Column(db.String, nullable= False, unique = True)
    hashed_password = db.Column(db.String, nullable=False)
    profileUrl = db.Column(db.String, nullable=False)
    jobId = db.Column(db.Integer, db.ForeignKey("jobs.id"))
    level = db.Column(db.Integer, nullable= False)
    createdAt = db.Column(db.DateTime , nullable= False)
    updatedAt = db.Column(db.DateTime , nullable= False)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
