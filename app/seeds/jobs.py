from app.models import db, Job
import datetime
def seed_jobs():
    tanks = ['Turtle', 'Giant Clam', 'Crab', 'Whale']

    supports = ['Manatee', 'Cleaner Wrasse', 'Remora', 'Barnacle']

    magical_dps = ['Electric Eel', 'Narwhal', 'Octopus', 'Dolphin']

    physical_dps = ['Shark','Orca','Swordfish','Mantis Shrimp']


    for tank in tanks:
        new_tank = Job(name=tank, role_id = 1 , created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_tank)

    for support in supports:
        new_support = Job(name=support, role_id = 2, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_support)

    for mdps in magical_dps:
        new_dps = Job(name=mdps, role_id = 3, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_dps)

    for pdps in physical_dps:
        new_dps = Job(name=pdps, role_id = 4, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_dps)

    db.session.commit()

def undo_jobs():
    db.session.execute('TRUNCATE jobs RESTART IDENTITY CASCADE;')
    db.session.commit()
