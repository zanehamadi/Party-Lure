import datetime
import random
from faker import Faker
from app.models import db, User, Job
from .utils import assign_from_dict, gen_count_dict

fake = Faker()
Faker.seed(0)
# Adds a demo user, you can add other users here if you want
def seed_users(num_users = 25):

    jobs_dict = gen_count_dict(Job)

    for i in range(num_users):
        new_user = User(
            username = fake.user_name(),
            email = fake.email(),
            profileUrl = fake.image_url(),
            jobId = assign_from_dict(jobs_dict, 4),
            level = random.randrange(50),
            createdAt=datetime.datetime.now(),
            updatedAt = datetime.datetime.now()
        )

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
