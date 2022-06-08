from flask import Blueprint, jsonify, request
from app.models import db, Post
from app.forms.post_form import PostCreateForm, PostEditForm

post_routes = Blueprint('posts', __name__)


@post_routes.route("/")
def get_all_posts():
    posts = Post.query.all()
    return { "posts": [post.to_dict() for post in posts]}

@post_routes.route("/", methods=["POST"])
def create_post():
    form = PostCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            user_id= form.user_id.data,
            content= form.content.data
        )

        db.session.add(post)
        db.session.commit()

        return post.to_dict()

    if form.errors:
        return form.errors

    return {"error": "Failed"}

@post_routes.route("/<int:id>", methods=["PUT"])
def edit_post(id):
    form = PostEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.content = form.content.data
        post.edited = True

        db.session.add(post)
        db.session.commit()

        return post.to_dict()

    if form.errors:
        return form.errors

    return {"error": "Failed"}

@post_routes.route("/<int:id>", methods=["DELETE"])
def delete_post(id):
    if (id):
        post = Post.query.get(id)

        db.session.delete(post)
        db.session.commit()

        return post.to_dict()
    else:
        return {"error": "No post was found to delete"}

    return {"error": "Failed"}
