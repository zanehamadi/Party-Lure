from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Comment

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {user.id: user.to_dict() for user in users}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    print("SENDING USER", user.to_dict())
    return user.to_dict()


# route to get all the comments for a user
@user_routes.route('/<int:user_id>/comments')
# @login_required
def get_user_comments(user_id):
    comments = Comment.query.filter(Comment.user_id == user_id)
    if comments:
        return {comment.id: comment.to_dict() for comment in comments}
    return "No Comments"
