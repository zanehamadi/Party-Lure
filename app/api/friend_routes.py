from flask import Blueprint


from  app.models import User


friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/user/<int:id>')
def get_friends(id):
    user = User.query.get(id)

    return {friend.id: friend.to_dict() for friend in user.friends}
