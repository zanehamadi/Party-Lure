import os
import re


from app.api.aws import public_file_upload
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Comment, db, FriendRequest, friend_request
from werkzeug.utils import secure_filename

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {user.id: user.to_dict() for user in users}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# route to get all the comments for a user
@user_routes.route('/<int:user_id>/comments')
# @login_required
def get_user_comments(user_id):
    comments = Comment.query.filter(Comment.user_id == user_id)
    if comments:
        return {comment.id: comment.to_dict() for comment in comments}
    return "No Comments"


@user_routes.route('/<int:user_id>/edit', methods = ['POST'])
def edit_user(user_id):
    upload_file = None
    profile_url = None

    level = request.form['level']
    job_id = request.form['jobId']

    try:
        uploaded_file = request.files['image']
        tmp_file_name = 'app/api/tmp/' + secure_filename(uploaded_file.filename)
        uploaded_file.save(tmp_file_name)
        profile_url = public_file_upload(tmp_file_name, 'partylureawsbucket' )
        os.remove(tmp_file_name)
    except KeyError:
        pass

    user = User.query.get(int(user_id))

    user.level = level if level else user.level
    user.job_id = job_id if job_id else user.job_id
    user.profile_url = profile_url if profile_url else user.profile_url

    db.session.add(user)

    db.session.commit()

    return user.to_dict()


# @user_routes.route('/<int:id>/requests/received')
# def received_requests(id):
#     friend_requests = FriendRequest.query.filter(FriendRequest.receiver_id == id)


#     return {received_request.id: received_request.to_dict() for received_request in friend_requests}


# @user_routes.route('/<int:id>/requests/sent')
# def sent_requests(id):
#     friend_requests = FriendRequest.query.filter(FriendRequest.sender_id == id)

#     return {sent_request.id: sent_request.to_dict() for sent_request in friend_requests}


# @user_routes.route('/requests/send', methods = ['POST'])
# def send_request():
#     data = request.get_json()

#     sender_id = data['sender_id']

#     receiver_id = data['receiver_id']


#     print('sender', sender_id, 'rec', receiver_id)

#     new_friend_request = FriendRequest(
#         sender_id = sender_id,
#         receiver_id = receiver_id
#     )
#     db.session.add(new_friend_request)

#     db.session.commit()

#     return new_friend_request.to_dict()


# @user_routes.route('/request/<int:id>/accept', methods = ['POST'])
# def accept_request(id):
#     data = request.get_json()

#     sender_id = data['sender_id']
#     receiver_id = data['receiver_id']

#     friend_request = FriendRequest.query.get(id)
#     user = User.query.get(receiver_id)

#     user.make_friend(sender_id)

#     db.session.add(user)
#     db.session.delete(friend_request)
#     db.session.commit()
#     return {'deleted':id}


# @user.route('/request/<int:id>', methods = ['DELETE'])
# def delete_request(id):
#     friend_request = FriendRequest.query.get(id)

#     db.session.delete(friend_request)
#     db.session.commit()
#     return {'deleted': id}
