from flask import Blueprint
from app.models import ActivityType

activity_type_routes = Blueprint('activity_types', __name__)

@activity_type_routes.route('/')
def activity_types():

    activity_types = ActivityType.query.all()

    return {activity_type.id:activity_type.to_dict() for activity_type in activity_types}
