from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    #columns
    id = db.Column(db.Integer, primary_key= True)
    title = db.Column(db.String)
    content = db.Column(db.Text)
    userId  = db.Column(db.Integer, db.ForeignKey("users.id"))
    activityId = db.Column(db.Integer, db.ForeignKey('activities.id'))
    open = db.Column(db.Boolean)
    createdAt = db.Column(db.DateTime , nullable= False)
    updatedAt = db.Column(db.DateTime , nullable= False)
    #relationships
    user = db.relationship('User', back_populates= 'posts')
    activity= db.relationship('Activity', back_populates= 'posts')
    comments = db.relationship('Comment', back_populates='post')


    def toDict(self):
        return {
            "id":self.id,
            "title":self.title,
            "content":self.content,
            "userId": self.userId,
            "user": self.user.name,
            "type": self.activity.type.name,
            "mission": self.activity.name
        }
