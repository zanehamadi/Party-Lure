from app.models import db, Job
import datetime
def seed_jobs():
    tanks = ['Turtle', 'Giant Clam', 'Crab', 'Whale']

    supports = ['Manatee', 'Cleaner Wrasse', 'Remora', 'Barnacle']

    magical_dps = ['Electric Eel', 'Narwhal', 'Octopus', 'Dolphin']

    physical_dps = ['Shark','Orca','Swordfish','Mantis Shrimp']


    for tank in tanks:
        new_tank = Job(name=tank, roleId = 1 , createdAt=datetime.datetime.now(),updatedAt = datetime.datetime.now())
        db.session.add(new_tank)

    for support in supports:
        new_support = Job(name=support, roleId = 2, createdAt=datetime.datetime.now(),updatedAt = datetime.datetime.now())
        db.session.add(new_support)

    for mdps in magical_dps:
        new_dps = Job(name=mdps, roleId = 3, createdAt=datetime.datetime.now(),updatedAt = datetime.datetime.now())
        db.session.add(new_dps)

    for pdps in physical_dps:
        new_dps = Job(name=pdps, roleId = 4, createdAt=datetime.datetime.now(),updatedAt = datetime.datetime.now())
        db.session.add(new_dps)

    db.session.commit()

def undo_jobs():
    db.session.execute('TRUNCATE jobs RESTART IDENTITY CASCADE;')
    db.session.commit()
