from flask import Blueprint, jsonify, session, request
from app.models import User, Post
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:postId>')
# @login_required
def post(post_id):
    post = Post.query.get(post_id)
    print(post.to_dict())
    return post.to_dict()

@post_routes.route('/')
def posts():

    posts = Post.query.all()

    return {post.id:post.to_dict() for post in posts}

@post_routes.route('/', methods=['POST'])
def new_post():
    data = request.get_json()
    post_id = data['postId']
    title = data['title']
    content = data['content']
    user_id = data['userId']
    recruit_level = data['recruitLevel']
    activity_id = data['activityId']



    if post_id:
        post = Post.query.get(int(post_id))
        # a if condition else b
        post.content = content if content else post.content
        post.recruit_level = recruit_level if recruit_level else post.recruit_level
    else
