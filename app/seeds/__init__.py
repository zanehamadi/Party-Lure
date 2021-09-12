from flask.cli import AppGroup
from .users import seed_users, undo_users
from .jobs import seed_jobs, undo_jobs
from.roles import seed_roles, undo_roles
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_roles()
    seed_jobs()
    seed_users()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_jobs()
    undo_roles()
    # Add other undo functions here
