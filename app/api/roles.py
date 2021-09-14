from flask import Blueprint

from app.models import Role

role_routes = Blueprint('roles', __name__)
@role_routes.route('/')
def roles():

    roles = Role.query.all()

    print('THIS IS ROLES IN ROUTE ----->', roles)

    return {role.id:role.to_dict() for role in roles}
