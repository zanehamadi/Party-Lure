from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField, SelectField
from wtforms.fields.simple import FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Job


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def user_level(form, field):
    # Checking if user level is valid
    user_level = field.data

    if user_level > 50:
        raise ValidationError('Level cap is currently 50.')


class SignUpForm(FlaskForm):
    # jobs = Job.query.all()
    image = FileField('profile-pic')
    # job = SelectField('job', choices= [(job.id, job.name) for job in jobs])
    level = IntegerField('level', validators=[DataRequired(), user_level])

    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
