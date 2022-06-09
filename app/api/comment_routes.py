from flask import Blueprint, jsonify, request
from app.models import db, Comment
from app.forms.comment_form import CommentCreateForm, CommentEditForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route("/", methods=["POST"])
def create_comment():
    form = CommentCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id= form.user_id.data,
            post_id= form.post_id.data,
            content= form.content.data
        )

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()

    if form.errors:
        return form.errors

    return {"error": "Failed"}


@comment_routes.route("/<int:id>", methods=["PUT"])
def edit_comment(id):
    form = CommentEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.content = form.content.data
        comment.edited = True

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()

    if form.errors:
        return form.errors

    return {"error": "Failed"}


@comment_routes.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    if (id):
        comment = Comment.query.get(id)

        old_comment = comment.to_dict()

        db.session.delete(comment)
        db.session.commit()

        return old_comment
    else:
        return {"error": "No comment was found to delete"}

    return {"error": "Failed"}
