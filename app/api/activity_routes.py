from flask import Blueprint
from app.models import Activity

activity_routes = Blueprint('activities', __name__)

@activity_routes.route('/')
def activities():

    activities = Activity.query.all()

    return {activity.id:activity.to_dict() for activity in activities}
