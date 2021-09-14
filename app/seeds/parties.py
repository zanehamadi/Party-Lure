
from app.models.party import Party
import datetime
from operator import pos

from app.models import db, Post, User, user
from app.seeds.utils import assign_from_dict, gen_count_dict

def seed_parties():

    posts = Post.query.all()

    for post in posts:
        owner_id = post.user_id
        user_dict = gen_count_dict(User)
        del user_dict[str(owner_id)]

        party_members = [User.query.get(owner_id)]
        for i in range(4):
            party_members.append(User.query.get(assign_from_dict(user_dict,1)))

        new_party = Party(
            post_id = post.id,
            owner_id = owner_id,
            created_at=datetime.datetime.now(),
            updated_at = datetime.datetime.now()

        )

        new_party.users = party_members

        db.session.add(new_party)

    db.session.commit()

def undo_parties():
    db.session.execute('TRUNCATE parties RESTART IDENTITY CASCADE;')
    db.session.commit()
