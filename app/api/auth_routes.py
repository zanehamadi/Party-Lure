import os
import datetime
from app.api.aws import public_file_upload
from flask import Blueprint, jsonify, session, request
from werkzeug.utils import secure_filename
from werkzeug.datastructures import ImmutableMultiDict
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        credential = form.data['credential']
        user = User.query.filter((User.email == credential) | (User.username == credential)).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        uploaded_file = request.files['image']
        tmp_file_name = 'app/api/tmp/' + secure_filename(uploaded_file.filename)
        uploaded_file.save(tmp_file_name)
        profile_url = public_file_upload(tmp_file_name, 'partylureawsbucket' )
        os.remove(tmp_file_name)
        job_id = request.form['jobId']

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            level = form.data['level'],
            profile_url = profile_url if profile_url else 'https://partylureawsbucket.s3.amazonaws.com/default.jpg',
            job_id = job_id,
            created_at=datetime.datetime.now(),
            updated_at = datetime.datetime.now()
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
