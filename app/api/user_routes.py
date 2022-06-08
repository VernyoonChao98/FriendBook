from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User
from app.forms.user_form import UserProfileEditForm

from app.api.aws_s3_bucket import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/profile/<int:id>', methods=["PUT"])
def profile_avatar_edit(id):
    form = UserProfileEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if request.files:
            image = request.files["image"]
            if not allowed_file(image.filename):
                return {"errors":"file type not permitted"}, 400

                image.filename = get_unique_filename(image.filename)

                upload = upload_file_to_s3(image)
                # check if upload worked
                if "url" not in upload:
                    return upload, 400

                url = upload["url"]
            else:
                url = None

        user = User.query.get(id)

        user.bio = form.bio.data
        user.avatar_url = url

        db.session.add(user)
        db.session.commit()
        return user.to_dict
    return {"error": "Failed"}

@user_routes.route('/banner/<int:id>', methods=["PUT"])
def profile_banner_edit(id):
    if request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors":"file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            # check if upload worked
            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        else:
            url = None

    user = User.query.get(id)

    user.banner_url = url

    db.session.add(user)
    db.session.commit()
    return user.to_dict
