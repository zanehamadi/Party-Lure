from .db import db

class ActivityType(db.Model):
    __tablename__ = 'activity_types'

    #columns
    id = db.Column( db.Integer, primary_key= True)
    name = db.Column(db.String(50))
    createdAt = db.Column(db.DateTime , nullable= False)
    updatedAt = db.Column(db.DateTime , nullable= False)

    #relationships
    activities = db.relationship('Activity', back_populates= 'type')
