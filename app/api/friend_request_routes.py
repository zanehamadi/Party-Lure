from flask import Blueprint, request

from app.models import User, Comment, db, FriendRequest, friend_request

friend_request_routes = Blueprint('requests', __name__)


@friend_request_routes.route('/user/<int:id>/received')
def received_requests(id):
    friend_requests = FriendRequest.query.filter(FriendRequest.receiver_id == id)


    return {received_request.id: received_request.to_dict() for received_request in friend_requests}


@friend_request_routes.route('/user/<int:id>/sent')
def sent_requests(id):
    friend_requests = FriendRequest.query.filter(FriendRequest.sender_id == id)

    return {sent_request.id: sent_request.to_dict() for sent_request in friend_requests}


@friend_request_routes.route('/send', methods = ['POST'])
def send_request():
    data = request.get_json()

    sender_id = data['sender_id']

    receiver_id = data['receiver_id']


    print('sender', sender_id, 'rec', receiver_id)

    new_friend_request = FriendRequest(
        sender_id = sender_id,
        receiver_id = receiver_id
    )
    db.session.add(new_friend_request)

    db.session.commit()

    return new_friend_request.to_dict()


@friend_request_routes.route('/<int:id>/accept', methods = ['POST'])
def accept_request(id):
    data = request.get_json()


    friend_request = FriendRequest.query.get(id)

    sender_id = friend_request.sender_id
    receiver_id = friend_request.receiver_id

    user = User.query.get(receiver_id)

    user.make_friend(sender_id)

    db.session.add(user)
    db.session.delete(friend_request)
    db.session.commit()

    return {'deleted':id}


@friend_request_routes.route('/<int:id>/delete', methods = ['DELETE'])
def delete_request(id):
    friend_request = FriendRequest.query.get(id)

    db.session.delete(friend_request)
    db.session.commit()
    return {'deleted': id}
