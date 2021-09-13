from faker import Faker
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
            userId = assign_from_dict(user_dict,3),
            activityId = assign_from_dict(activity_dict,2),
            open = True,
            createdAt=datetime.datetime.now(),
            updatedAt = datetime.datetime.now()
        )

        db.session.add(new_post)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
