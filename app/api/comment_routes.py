from flask import Blueprint, jsonify, session, request
from app.models import User, Comment, Post, db
import datetime
# from app.forms import co
# from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:comment_id>')
# @login_required
def comment(comment_id):
    comment = Comment.query.get(comment_id)
    return comment.to_dict()


@comment_routes.route('/')
# @login_required
def comments():
    comments = Comment.query.all()
    # return {"comments": [comment.to_dict() for comment in comments]}
    return {comment.id: comment.to_dict() for comment in comments}


@comment_routes.route('/', methods=["POST"])
# @login_required
def create_comment():
    data = request.get_json()
    new_comment = Comment(
        content=data['content'],
        created_at=datetime.datetime.now(),
        post_id=data['post_id'],
        updated_at=datetime.datetime.now(),
        user_id=data['user_id'],
    )
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()


@comment_routes.route('/<int:comment_id>', methods=["PUT"])
# @login_required
def edit_comment(comment_id):
    data = request.get_json()
    comment = Comment.query.get(comment_id)
    if comment:
        comment.content = data['content'],
        comment.created_at = comment.created_at,
        comment.post_id = data['post_id'],
        comment.updated_at = datetime.datetime.now(),
        comment.user_id = data['user_id']

        db.session.commit()
        return comment.to_dict()
    return {"Error": "comment not found"}


@comment_routes.route('/<int:comment_id>', methods=["DELETE"])
# @login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {"Success": "comment deleted"}
    return {"Error": "comment not found"}
