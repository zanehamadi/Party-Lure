from flask import Blueprint, jsonify, session, request
from app.models import User, Comment, Post
# from app.forms import co
# from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:comment_id>')
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


@comment_routes.route('/', methods=["POST"])
# @login_required
def create_post():
    data = request.get_json()
    print(data)
    new_comment = Comment(
        content=data['content'],
        created_at=data['created_at'],
        post_id=data['post_id'],
        updated_at=data['updated_at'],
        user_id=data['user_id'],
    )
    print(new_comment)
    return new_comment.to_dict()
