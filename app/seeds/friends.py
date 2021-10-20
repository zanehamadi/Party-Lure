


from app.models import db , User


def seed_friends():

    user = User.query.get(1)

    for i in range(2,10):
        friend = User.query.get(i)
        user.friends.append(friend)
        friend.friends.append(user)

        db.session.add(friend)


    db.session.add(user)

    db.session.commit()


def undo_friends():
    db.session.execute('TRUNCATE users_friends RESTART IDENTITY CASCADE')
