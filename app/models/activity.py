from .db import db

class Activity(db.Model):
    __tablename__ = 'activities'

    #columns
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(200))
    typeId = db.Column(db.Integer, db.ForeignKey('activity_types.id'))
    createdAt = db.Column(db.DateTime , nullable= False)
    updatedAt = db.Column(db.DateTime , nullable= False)
    #relationships
    type = db.relationship('ActivityType', back_populates= 'activities')
    posts = db.relationship('Post', back_populates= 'activity')
    #methods
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type":self.type.name
        }
