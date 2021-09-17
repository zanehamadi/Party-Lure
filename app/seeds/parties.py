
from random import randrange
from app.models.party import Party
import datetime
from operator import pos
from faker import Faker

fake = Faker()
Faker.seed(0)

from app.models import db, Post, User, user
from app.seeds.utils import assign_from_dict, gen_count_dict

def seed_parties():

    posts = Post.query.all()

    for post in posts:
        owner_id = post.user_id
        user_dict = gen_count_dict(User)
        del user_dict[str(owner_id)]
        owner = User.query.get(owner_id)
        party_members = [owner]
        for i in range(randrange(3)):
            party_members.append(User.query.get(assign_from_dict(user_dict,1)))

        new_party = Party(
            post_id = post.id,
            owner_id = owner_id,
            title = f"""{owner.username}'s {post.to_dict()['mission']} {post.to_dict()["type"]}""",
            created_at=datetime.datetime.now(),
            updated_at = datetime.datetime.now()

        )

        new_party.users = party_members

        db.session.add(new_party)

    db.session.commit()

def undo_parties():
    db.session.execute('TRUNCATE parties RESTART IDENTITY CASCADE;')
    db.session.commit()
