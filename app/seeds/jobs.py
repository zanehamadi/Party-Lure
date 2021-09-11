from typing import SupportsAbs
from app.models import db, Job
import datetime
def seed_roles():
    tanks = ['Turtle', 'Giant Clam', 'Crab', 'Whale']

    supports = ['Manatee', 'Cleaner Wrasse', 'Remora', 'Barnacle']

    magical_dps = ['Electric Eel', 'Narwhal', 'Octopus', 'Dolphin']

    physical_dps = ['Shark','Orca','Swordfish','Mantis Shrimp']


    for tank in tanks:
        new_tank = Job(name=tank, roleId = 1 )
        db.session.add(new_tank)

    for support in supports:
        new_support = Job(name=support, roleId = 2)
    db.session.commit()
