from flask import Blueprint, jsonify, session, request
from app.models import User, Party, db, user
from flask_login import current_user, login_user, logout_user, login_required

party_routes = Blueprint('parties', __name__)

@party_routes.route('/')
def parties():
    parties = Party.query.all()
    # party_users = Party.query.join(Party.users).all()
    # return {'party_users': [party_user.to_dict() for party_user in party_users]}
    return {party.id:party.to_dict() for party in parties}


@party_routes.route('/<int:party_id>')

def party(party_id):
    party = Party.query.get(party_id)
    return party.to_dict()

@party_routes.route('/<int:party_id>/request', methods = ['POST'])
def request_party(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))

    print('REQUESTS BEFORE', party.to_dict()['requests'])

    party.requests.append(user)

    db.session.add(party)

    db.session.commit()

    print('REQUESTS After', party.to_dict()['requests'])

    return party.to_dict()

@party_routes.route('/<int:party_id>/accept', methods = ['POST'])
def accept_request(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))
    print('USERS BEFORE', party.to_dict()['users'])
    party.requests.remove(user)

    party.users.append(user)

    db.session.add(party)
    print('USERS AFTER', party.to_dict()['users'])
    db.session.commit()

    return party.to_dict()

@party_routes.route('/<int:party_id>/deny', methods = ['POST'])
def deny_request(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))
    print('USERS BEFORE', party.to_dict()['users'])
    party.requests.remove(user)

    db.session.add(party)
    db.session.commit()

    return party.to_dict()
@party_routes.route('/user/<int:user_id>')
def get_user_parties(user_id):
    this_users_parties = Party.query.filter(Party.owner_id == int(user_id))

    return {'user_parties': [el.to_dict() for el in this_users_parties]}
@party_routes.route('/user/<int:user_id>/requests')
def get_user_requests(user_id):
    user = User.query.get(int(user_id))
    
    parties_user_wants = Party.query.filter(Party.requests.contains(user))

    return {'user_party_reqs' : el.to_dict() for el in parties_user_wants}
