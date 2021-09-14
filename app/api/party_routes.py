from flask import Blueprint, jsonify, session, request
from app.models import User, Party
from flask_login import current_user, login_user, logout_user, login_required

party_routes = Blueprint('parties', __name__)

@party_routes.route('/')
def parties():

    parties = Party.query.all()
    return {party.id:party.to_dict() for party in parties}


@party_routes.route('/<int:party_id>')

def party(party_id):
    party = Party.query.get(party_id)
    return party.to_dict()
