from app.seeds.comments import seed_comments, undo_comments
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .jobs import seed_jobs, undo_jobs
from .roles import seed_roles, undo_roles
from .activity_type import seed_types, undo_types
from .activities import seed_activities, undo_activities
from .posts import seed_posts, undo_posts
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_roles()
    seed_jobs()
    seed_users()
    seed_types()
    seed_activities()
    seed_posts()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_posts()
    undo_users()
    undo_jobs()
    undo_roles()
    undo_activities()
    undo_types()
    # Add other undo functions here
