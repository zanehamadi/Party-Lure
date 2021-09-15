from app.models import db, Role
import datetime


def seed_roles():

    roles = ['Tank', 'Support', 'Magical DPS', 'Physical DPS']

    def url_selector(role):
        if role == 'Tank':
            return "https://partylureawsbucket.s3.amazonaws.com/Tank.png"
        elif role == 'Support':
            return "https://partylureawsbucket.s3.amazonaws.com/Healer.png"
        elif role == 'Magical DPS':
            return "https://partylureawsbucket.s3.amazonaws.com/Magic_Ranged_DPS.png"
        elif role == 'Physical DPS':
            return "https://partylureawsbucket.s3.amazonaws.com/Healer.png"

    for role in roles:
        new_role = Role(name=role, created_at=datetime.datetime.now(
        ), updated_at=datetime.datetime.now(), icon_url=url_selector(role))
        db.session.add(new_role)

    db.session.commit()


def undo_roles():
    db.session.execute('TRUNCATE roles RESTART IDENTITY CASCADE;')
    db.session.commit()
