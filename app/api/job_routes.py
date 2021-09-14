from flask import Blueprint

from app.models import Job

job_routes = Blueprint('jobs', __name__)
@job_routes.route('/')
def jobs():

    jobs = Job.query.all()

    return {job.id:job.to_dict() for job in jobs}
