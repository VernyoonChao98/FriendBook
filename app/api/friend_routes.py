from flask import Blueprint, jsonify, request
from app.models import db, Friend
from app.forms.friend_form import FriendRequestForm

friend_routes = Blueprint('friends', __name__)

# Gets all friends
@friend_routes.route("/<int:id>")
def get_all_my_friends(id):
    friends_a = Friend.query.filter(Friend.user_a == id, Friend.status == True).all()
    friends_b = Friend.query.filter(Friend.user_b == id, Friend.status == True).all()
    # friends_a = Friend.query.filter(Friend.user_a == id).all()
    # friends_b = Friend.query.filter(Friend.user_b == id).all()
    return { "acceptedSentFQ": [friend.to_dict() for friend in friends_a], "acceptedReceivedFQ": [friend.to_dict() for friend in friends_b]}

# Gets all my sent friend requests
@friend_routes.route("/sentFQ/<int:id>")
def get_all_my_sent_friend_request(id):
    friends = Friend.query.filter(Friend.user_a == id, Friend.status == False).all()
    return { "sentFQ": [friend.to_dict() for friend in friends]}

# Gets all my received friend requests that can be accepted or denied
@friend_routes.route("/receivedFQ/<int:id>")
def get_all_my_friend_request(id):
    friends = Friend.query.filter(Friend.user_b == id, Friend.status == False).all()
    return { "receivedFQ": [friend.to_dict() for friend in friends]}

# Creates a friend request
@friend_routes.route("/<int:id>", methods=["POST"])
def create_friend_request(id):
    form = FriendRequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    friendSent = Friend.query.filter( Friend.user_a == form.user_a.data, Friend.user_b == id).first()
    friendRQ = Friend.query.filter( Friend.user_a == id, Friend.user_b == form.user_a.data).first()

    if friendSent or friendRQ:
        return {"error": "Already friends or there is a pending request."}

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

# Confirms a friend request to be friends
@friend_routes.route("/<int:id>", methods=["PUT"])
def confirm_friend(id):
    # form = FriendRequestForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    friend = Friend.query.get(id)
    friend.status = True

    db.session.add(friend)
    db.session.commit()

    return friend.to_dict()

    # if form.errors:
    #     return form.errors

    # return {"error": "Failed"}

# Denies/Cancels a friend request to be friends
@friend_routes.route("/<int:id>", methods=["DELETE"])
def delete_friend(id):
    if (id):
        friend = Friend.query.get(id)

        old_friend = friend.to_dict()

        db.session.delete(friend)
        db.session.commit()

        return old_friend
    else:
        return {"error": "No friend was found to delete"}

    return {"error": "Failed"}
