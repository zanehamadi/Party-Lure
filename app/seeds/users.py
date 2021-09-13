import datetime
import random
from faker import Faker
from app.models import db, User, Job, user
from .utils import assign_from_dict, gen_count_dict

fake = Faker()
Faker.seed(0)
# Adds a demo user, you can add other users here if you want
def seed_users(num_users = 25):

    jobs_dict = gen_count_dict(Job)

    for i in range(num_users):
        if i%2 == 0:
            username = fake.user_name()
        else:
            username = fake.name_nonbinary()

        new_user = User(
            username = username,
            email = fake.email(),
            profile_url = fake.image_url(),
            password = 'password',
            job_id = assign_from_dict(jobs_dict, 2),
            level = random.randrange(50),
            created_at=datetime.datetime.now(),
            updated_at = datetime.datetime.now()
        )

        db.session.add(new_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
