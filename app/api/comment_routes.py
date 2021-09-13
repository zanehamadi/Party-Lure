from flask import Blueprint, jsonify, session, request
from app.models import User, Comment, Post
# from app.forms import co
# from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:commentId>')
# @login_required
def comment(comment_id):
    comment = Comment.query.get(comment_id)
    print(comment.to_dict())
    return comment.to_dict()


@comment_routes.route('/')
# @login_required
def comments():
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments]}
