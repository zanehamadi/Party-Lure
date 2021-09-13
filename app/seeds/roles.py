from app.models import db, Role
import datetime
def seed_roles():

    roles = ['Tank','Support','Magical DPS','Physical DPS']

    for role in roles:
        new_role = Role(name=role, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_role)

    db.session.commit()

def undo_roles():
    db.session.execute('TRUNCATE roles RESTART IDENTITY CASCADE;')
    db.session.commit()
