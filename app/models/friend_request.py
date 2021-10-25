from .db import db
from .user import User

from datetime import datetime


now = datetime.now()

class FriendRequest(db.Model):
    __tablename__ = 'friend_requests'

    id = db.Column(db.Integer(), primary_key = True)

    sender_id = db.Column(db.Integer(),  db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer(),  db.ForeignKey('users.id'))

    sender= db.relationship('User', back_populates = 'sent_requests', foreign_keys = 'FriendRequest.sender_id')

    receiver= db.relationship('User', back_populates = 'received_requests', foreign_keys = 'FriendRequest.receiver_id')


    def to_dict(self):
        return{
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "sender": self.sender.username,
            "receiver": self.receiver.username,
            "sender_pic": self.sender.profile_url,
            "receiver_pic": self.receiver.profile_url
        }
