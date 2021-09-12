from app.models import db, ActivityType
import datetime
def seed_types():

    a_types = ['Leveling','Questing','Gathering','Dungeons', 'Raids']

    for a_type in a_types:
        new_type = ActivityType(name=a_type, createdAt=datetime.datetime.now(),updatedAt = datetime.datetime.now())
        db.session.add(new_type)

    db.session.commit()

def undo_types():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
