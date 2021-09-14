from .db import db

class ActivityType(db.Model):
    __tablename__ = 'activity_types'

    #columns
    id = db.Column( db.Integer, primary_key= True)
    name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime , nullable= False)
    updated_at = db.Column(db.DateTime , nullable= False)

    #relationships
    activities = db.relationship('Activity', back_populates= 'type')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
