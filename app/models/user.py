from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    #columns
    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String, nullable= False, unique= True)
    email = db.Column(db.String, nullable= False, unique = True)
    hashed_password = db.Column(db.String, nullable=False)
    profileUrl = db.Column(db.String, nullable=False)
    jobId = db.Column(db.Integer, db.ForeignKey("jobs.id"))
    level = db.Column(db.Integer, nullable= False)
    createdAt = db.Column(db.DateTime , nullable= False)
    updatedAt = db.Column(db.DateTime , nullable= False)

    #relationships
    job = db.relationship('Job', back_populates= 'users')

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

    parties = db.relationship('Party', secondary='users_parties', back_populates= 'users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    #methods
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_posts(self):
        post_dics = {post.id:post.toDict() for post in self.posts}

        return post_dics

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'jobId': self.jobId,
            'level': self.level,
            'job': self.job.name,
            'role': self.job.role.name
        }
