from .db import db


class Party(db.Model):
    __tablename__ = 'parties'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # relationships
    post = db.relationship('Post', back_populates='party')
    users = db.relationship(
        'User', secondary='users_parties', back_populates='parties')
    requests = db.relationship(
        'User', secondary='parties_requests', back_populates='party_requests')

    def to_dict(self):
        return {
            "users": [user.to_dict() for user in self.users],
            "id": self.id,
            "post_id": self.post_id,
            "owner_id": self.owner_id,
            "requests": [user.to_dict() for user in self.requests ],
            "title": self.title,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


users_parties = db.Table(
    "users_parties",
    db.Column('id', db.Integer, primary_key=True),
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
