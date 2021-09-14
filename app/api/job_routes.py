from flask import Blueprint

from app.models import Job

job_routes = Blueprint('jobs', __name__)
@job_routes.route('/')
def jobs():

    jobs = Job.query.all()

    print('THIS IS JOBS IN ROUTE ----->', jobs)

    return {job.id:job.to_dict() for job in jobs}
