from .db import db

class Party(db.Model):
    __tablename__ = 'parties'

    #columns
    id = db.Column(db.Integer, primary_key= True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime , nullable= False)
    updated_at = db.Column(db.DateTime , nullable= False)

    #relationships
    post = db.relationship('Post', back_populates='party')
    users = db.relationship('User', secondary='users_parties', back_populates= 'parties')
    requests = db.relationship('User', secondary='parties_requests', back_populates='party_requests')

users_parties = db.Table(
    "users_parties",
    db.Column('id',db.Integer, primary_key=True),
    db.Column(
        'user_id', db.Integer, db.ForeignKey("users.id")
    ),
    db.Column(
        'party_id', db.Integer, db.ForeignKey('parties.id')
    )
)
parties_requests = db.Table(
    "parties_requests",
    db.Column('id', db.Integer, primary_key=True),
    db.Column(
        'user_id', db.Integer, db.ForeignKey("users.id")
    ),
    db.Column(
        'party_id', db.Integer, db.ForeignKey("parties.id")
    )
    )
