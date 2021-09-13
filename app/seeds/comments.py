from app.seeds.utils import assign_from_dict, gen_count_dict
from faker import Faker
import datetime

from app.models import  db, Post, User, Comment

fake = Faker()
Faker.seed(0)

def seed_comments(num_comments = 100):

    user_dict = gen_count_dict(User)
    post_dict = gen_count_dict(Post)

    for i in range(num_comments):

        new_comment = Comment(
            content = fake.paragraph(nb_sentences=3),
            userId = assign_from_dict(user_dict,6),
            postId = assign_from_dict(post_dict,10),
            createdAt=datetime.datetime.now(),
            updatedAt = datetime.datetime.now()
        )

        db.session.add(new_comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
