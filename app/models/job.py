from .db import db

class Job(db.Model):
    __tablename__ ='jobs'

    #columns
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(50), nullable= False)
    roleId = db.Column(db.Integer, db.ForeignKey('roles.id'))
    createdAt = db.Column(db.DateTime , nullable= False)
    updatedAt = db.Column(db.DateTime , nullable= False)

    #relationships
    role = db.relationship('Role', back_populates= 'jobs')

    users = db.relationship('User', back_populates='job')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
