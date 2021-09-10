from .db import db

class Role(db.Model):
    __tablename__ = 'roles'

    #columns
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(25), nullable= False)
    createdAt = db.Column(db.DateTime , nullable= False)
    updatedAt = db.Column(db.DateTime , nullable= False)

    #relationships
    jobs = db.relationship('Job', back_populates='role')
