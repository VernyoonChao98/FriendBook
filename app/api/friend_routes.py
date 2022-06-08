from flask import Blueprint, jsonify
from app.models import Friend
from app.forms.friend_form import FriendRequestForm

friend_routes = Blueprint('friends', __name__)

@friend_routes.route("/<ind:id>")
def get_all_my_friends(id):
    friends = Friend.query.filter(user_a == id).all()
    return { "friends": [friend.to_dict() for friend in friends]}

@friend_routes.route("/<int:id>", methods=["POST"])
def create_friend_request(id):
    form = FriendRequestForm()
    if form.validate_on_submit():
        friend = Friend(
            user_a= form.user_a.data,
            user_b= id,
        )

        db.session.add(friend)
        db.session.commit()

        return friend.to_dict()

    if form.errors:
        return form.errors

    return {"error": "Failed"}

@friend_routes.route("/<int:id>", methods=["PUT"])
def confirm_friend(id):
    form = FriendRequestForm()
    if form.validate_on_submit():
        friend = Friend.query.get(id)
        friend.status = True

        db.session.add(friend)
        db.session.commit()

        return friend.to_dict()

    if form.errors:
        return form.errors

    return {"error": "Failed"}


@friend_routes.route("/<int:id>", methods=["DELETE"])
def delete_friend(id):
    if (id):
        friend = Friend.query.get(id)

        db.session.delete(friend)
        db.session.commit()

        return friend.to_dict()
    else:
        return {"error": "No friend was found to delete"}

    return {"error": "Failed"}
