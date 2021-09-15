from .db import db


class Role(db.Model):
    __tablename__ = 'roles'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    icon_url = db.Column(db.String, nullable=False)

    # relationships
    jobs = db.relationship('Job', back_populates='role')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'icon_url': self.icon_url
        }
