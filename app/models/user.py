from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .party import users_parties


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String, nullable=False)
    profile_url = db.Column(db.String, nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey("jobs.id"))
    level = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # relationships
    job = db.relationship('Job', back_populates='users')

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

    parties = db.relationship(
        'Party', secondary='users_parties', back_populates='users')
    party_requests = db.relationship(
        'Party', secondary='parties_requests', back_populates='requests')


    sent_requests = db.relationship('FriendRequest', back_populates = 'sender', foreign_keys = 'FriendRequest.sender_id')

    received_requests = db.relationship('FriendRequest', back_populates = 'receiver', foreign_keys = 'FriendRequest.receiver_id')


    friends = db.relationship(
        'User', lambda: users_friends,
        primaryjoin = lambda: User.id == users_friends.c.user1_id,
        secondaryjoin = lambda: User.id == users_friends.c.user2_id,
    )
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    # methods
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_posts(self):
        post_dics = {post.id: post.to_dict() for post in self.posts}

        return post_dics

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'job_id': self.job_id,
            'level': self.level,
            'job': self.job.name,
            'role': self.job.role.name,
            'profile_url': self.profile_url,
            'role_url': self.job.icon_url
        }



users_friends = db.Table('users_friends',
    db.Column('user1_id', db.Integer, db.ForeignKey(User.id), primary_key=True),
    db.Column('user2_id', db.Integer, db.ForeignKey(User.id), primary_key=True),
)
