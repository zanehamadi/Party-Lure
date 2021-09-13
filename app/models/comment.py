from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    # relationships
    post = db.relationship('Post', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def toDict(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
            "content": self.content,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
