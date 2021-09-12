# from .db import db

# class Party(db.Model):
#     __tablename__ = 'parties'

#     #columns
#     id = db.Column(db.Integer, primary_key= True)
#     postId = db.Column(db.Integer, db.ForeignKey('posts.id'))
#     ownerId = db.Column(db.Integer, db.ForeignKey('users.id'))
#     createdAt = db.Column(db.DateTime , nullable= False)
#     updatedAt = db.Column(db.DateTime , nullable= False)

#     #relationships
#     users = db.relationship('User', secondary='users_parties', back_populates= 'parties')


# users_parties = db.Table(
#     "users_parties",
#     db.Column('id',db.Integer, primary_key=True),
#     db.Column(
#         'userId', db.Integer, db.ForeignKey("users.id")
#     ),
#     db.Column(
#         'partyId', db.Integer, db.ForeignKey('parties.id')
#     )
# )
