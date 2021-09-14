
from operator import pos
from flask import Blueprint, jsonify, session, request
import datetime
from app.models import db, User, Post, Comment
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():

    posts = Post.query.all()

    return {post.id: post.to_dict() for post in posts}


@post_routes.route('/<int:post_id>')
# @login_required
def post(post_id):
    post = Post.query.get(post_id)
    print(post.to_dict())
    return post.to_dict()


@post_routes.route('/', methods=['POST'])
def new_post():
    data = request.get_json()
    post_id = None
    try:
        post_id = data['postId']
    except KeyError:
        print('new post')
    title = data['title']
    content = data['content']
    user_id = data['userId']
    recruit_level = data['recruitLevel']
    activity_id = data['activityId']
    recruit_role = data['recruitRole']

    if post_id:
        post = Post.query.get(int(post_id))

        # a if condition else b
        post.content = content if content else post.content
        post.recruit_level = recruit_level if recruit_level else post.recruit_level
        post.activity_id = activity_id if activity_id else post.activity_id
        post.recruit_role = recruit_role if recruit_role else post.recruit_role
        post.updated_at = datetime.datetime.now()
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    else:
        post = Post(
            title=title,
            content=content,
            user_id=user_id,
            recruit_level=recruit_level,
            recruit_role=recruit_role,
            activity_id=activity_id,
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()


@post_routes.delete('/<int:post_id>')
def delete_post(post_id):
    post = Post.query.get(int(post_id))
    db.session.delete(post)
    db.session.commit()
    return 'deleted'


# route to get all the comments for a post
@post_routes.route('/<int:post_id>/comments')
# @login_required
def get_post_comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id)
    if comments:
        return {comment.id: comment.to_dict() for comment in comments}
    return "No Comments"
