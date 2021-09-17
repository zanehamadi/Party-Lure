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

@party_routes.route('/<int:party_id>/send', methods = ['POST'])
def request_party(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))

    party_dict = party.to_dict()

    if len(party_dict["users"]) >= 4:
        return {"errors": ['Party is full']}


    party.requests.append(user)

    db.session.add(party)

    db.session.commit()

    return party.to_dict()

@party_routes.route('/<int:party_id>/accept', methods = ['POST'])
def accept_request(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))

    party_dict = party.to_dict()
    if len(party_dict['users']) >= 4:
        return {"errors": ['Party is full']}


    party.requests.remove(user)

    party.users.append(user)

    db.session.add(party)

    db.session.commit()

    return party.to_dict()

@party_routes.route('/<int:party_id>/deny', methods = ['POST'])
def deny_request(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))

    party.requests.remove(user)

    db.session.add(party)
    db.session.commit()

    return party.to_dict()
@party_routes.route('/user/<int:user_id>')
def get_user_parties(user_id):
    this_users_parties = Party.query.filter(Party.owner_id == int(user_id))

    return {el.id:el.to_dict() for el in this_users_parties}
@party_routes.route('/user/<int:user_id>/sent')
def get_sent_requests(user_id):
    user = User.query.get(int(user_id))

    parties_user_wants = Party.query.filter(Party.requests.contains(user))

    return {el.id:el.to_dict() for el in parties_user_wants}

@party_routes.route('/user/<int:user_id>/received')
def get_received_requests(user_id):


    parties_with_requests = Party.query.filter(Party.owner_id == user_id )


    dict_parties = [party.to_dict() for party in parties_with_requests]

    return {el["id"]:el for el in dict_parties if len(el['requests']) > 0}

@party_routes.route('/<int:party_id>/leave', methods = ['DELETE'])
def leave_party(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))

    party.users.remove(user)

    db.session.add(party)
    db.session.commit()

    return party.to_dict()

@party_routes.route('/<int:party_id>/cancel', methods = ['DELETE'])
def cancel_request(party_id):
    data = request.get_json()

    user_id = data['userId']

    user = User.query.get(int(user_id))

    party = Party.query.get(int(party_id))

    party.requests.remove(user)

    db.session.add(party)
    db.session.commit()

    return party.to_dict()
