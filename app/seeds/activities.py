from app.models import db, Activity
import datetime
def seed_activities():
    leveling = ['Low Rank', 'High Rank', 'G Rank']

    questing = ['Getting Fishy', 'Shallow Water', 'Sea Frenzy', 'Cold Depths', "Tiger Shark's Eggs", 'Buried Treasure', 'Investigate the pirate ship', "Evil's beginning"]

    gathering = ['Low Rank', 'High Rank', 'G Rank']

    dungeons = ['Guppypond Gallows', 'Tadpole Sanctuary', 'Tidepool', 'Rock Bottom', "Whale's Graveyard", 'Eventide Arena', 'Beenthicc Cavern', 'Anglerfish Whirpool', 'Abyssal Atrium']

    raids = ['Marianas Trench', 'Kingfisher Palace', 'Colossal Squid Nightmare', 'Megalodon Merriment', 'Darkest Depths']


    for activity in leveling:
        new_activity = Activity(name=activity, type_id = 1 , created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_activity)

    for activity in questing:
        new_activity = Activity(name=activity, type_id = 2, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_activity)

    for activity in gathering:
        new_activity = Activity(name=activity, type_id = 3, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_activity)

    for activity in dungeons:
        new_activity = Activity(name=activity, type_id = 4, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_activity)

    for activity in raids:
        new_activity = Activity(name=activity, type_id = 5, created_at=datetime.datetime.now(),updated_at = datetime.datetime.now())
        db.session.add(new_activity)

    db.session.commit()

def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
