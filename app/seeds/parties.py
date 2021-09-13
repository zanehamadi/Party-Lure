
from app.models.party import Party
import datetime
from operator import pos

from app.models import db, Post, User, user
from app.seeds.utils import assign_from_dict, gen_count_dict

def seed_parties():

    posts = Post.query.all()

    for post in posts:
        ownerId = post.userId
        user_dict = gen_count_dict(User)
        del user_dict[str(ownerId)]

        party_members = [User.query.get(ownerId)]
        for i in range(1):
            party_members.append(User.query.get(assign_from_dict(user_dict,1)))

        new_party = Party(
            postId = post.id,
            ownerId = ownerId,
            createdAt=datetime.datetime.now(),
            updatedAt = datetime.datetime.now()

        )

        new_party.users = party_members

        db.session.add(new_party)

    db.session.commit()

def undo_parties():
    db.session.execute('TRUNCATE parties RESTART IDENTITY CASCADE;')
    db.session.commit()
