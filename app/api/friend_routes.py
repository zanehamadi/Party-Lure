from datetime import datetime
from flask import Blueprint, request


from  app.models import User


friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/user/<int:id>')
def get_friends(id):
    user = User.query.get(id)

    return {friend.id: friend.to_dict() for friend in user.friends}

@friend_routes.route('/user/<int:id>/delete', methods = ['DELETE'])
def remove_friend(id):

    data = request.get_json()
    print('this is friend datat', data)
    user = User.query.get(id)

    friend_id = data['friend_id']

    user.remove_friend(friend_id)

    return {'deleted': friend_id}
