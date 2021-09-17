from faker import Faker
from random import randrange
import datetime

from app.seeds.utils import assign_from_dict, gen_count_dict
from app.models import db, Post, User, Activity

fake = Faker()
Faker.seed(0)

def seed_posts(num_posts = 50):

    user_dict = gen_count_dict(User)
    activity_dict = gen_count_dict(Activity)

    for i in range(num_posts):

        new_post = Post(
            title = fake.paragraph(nb_sentences=2),
            content = fake.paragraph(nb_sentences=5),
            user_id = assign_from_dict(user_dict,3),
            recruit_level = randrange(1,50),
            recruit_role = [randrange(1,4),randrange(1,4)],
            activity_id = assign_from_dict(activity_dict,2),
            open = True,
            created_at=datetime.datetime.now(),
            updated_at = datetime.datetime.now()
        )

        db.session.add(new_post)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
