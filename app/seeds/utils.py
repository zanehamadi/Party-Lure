from app.models import User
def gen_count_dict(Model):
    items = Model.query.all()
    count_obj = dict()

    for item in items:
        count_obj[str(item.id)] = {'id':item.id, 'count': 0}

    return count_obj

print(gen_count_dict())
