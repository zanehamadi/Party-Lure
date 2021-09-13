from flask import Blueprint, jsonify, session, request
from app.models import User, Post
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def posts():

    posts = Post.query.all()

    return {post.id:post.to_dict() for post in posts}


@post_routes.route('/<int:postId>')
# @login_required
def post(post_id):
    post = Post.query.get(post_id)
    print(post.to_dict())
    return post.to_dict()

