from .db import db
from sqlalchemy.dialects.postgresql import ARRAY

class Post(db.Model):
    __tablename__ = 'posts'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recruit_level = db.Column(db.Integer, nullable=False)
    recruit_role = db.Column(ARRAY(db.Integer))
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'))
    open = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    # relationships
    party = db.relationship('Party', back_populates='post')
    user = db.relationship('User', back_populates='posts')
    activity = db.relationship('Activity', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "user_id": self.user_id,
            "user": self.user.username,
            "type": self.activity.type.name,
            "mission": self.activity.name,
            "recruit_level": self.recruit_level,
            "recruit_role": self.recruit_role

        }
