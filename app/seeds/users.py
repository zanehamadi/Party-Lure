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

    demo_user = User(
        username = 'Demo Fish',
        email= 'demo@fish.com',
        profile_url = 'https://partylureawsbucket.s3.amazonaws.com/party_lure_demo_profile.jpg',
        password = 'password',
        job_id = 1,
        level = 25,
        created_at=datetime.datetime.now(),
        updated_at = datetime.datetime.now()
    )

    db.session.add(demo_user)
    db.session.commit()


    for i in range(num_users):
        if i%2 == 0:
            username = fake.user_name()
        else:
            username = fake.name_nonbinary()

        job_id = assign_from_dict(jobs_dict, 2)
        profile_url = f'https://partylureawsbucket.s3.amazonaws.com/party_lure_job_pics/{job_id}.png'
        new_user = User(
            username = username,
            email = fake.email(),
            job_id = job_id,
            profile_url = profile_url,
            password = 'password',
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
