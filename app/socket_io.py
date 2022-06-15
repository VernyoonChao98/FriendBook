from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db, User

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

# @socketio.on("chat")
# def handle_chat(data):
#     emit("chat", broadcast=True, to=data["room"])

# @socketio.on("online")
# def turn_online(data):
#     user = User.query.get(data["id"])
#     user.online = True
#     db.session.add(user)
#     db.session.commit()
#     emit("online", broadcast=True)

# @socketio.on("offline")
# def turn_online(data):
#     user = User.query.get(data["id"])
#     user.online = False
#     db.session.add(user)
#     db.session.commit()
#     emit("offline", broadcast=True)

@socketio.on('join')
def on_join(data):
    room = data['roomUrl']
    join_room(room)

@socketio.on('leave')
def on_leave(data):
    room = data['roomUrl']
    leave_room(room)

@socketio.on('updatedProfile')
def updated_profile(data):
    room = data['roomUrl']
    emit("updatedProfile", data, to=room)

@socketio.on('updatedProfileHome')
def updated_profile_home(data):
    emit("updatedProfileHome", data, broadcast=True)

@socketio.on('updatedBanner')
def updated_banner(data):
    room = data['roomUrl']
    emit("updatedBanner", data, to=room)

@socketio.on('createPost')
def create_post(data):
    room = data['roomUrl']
    emit("createPost", data, to=room)

@socketio.on('createPostHome')
def create_post_home(data):
    emit("createPostHome", data, broadcast=True)

@socketio.on('editPost')
def edit_post(data):
    room = data['roomUrl']
    emit("editPost", data, to=room)

@socketio.on('editPostHome')
def edit_post_home(data):
    emit("editPostHome", data, broadcast=True)

@socketio.on('deletePost')
def delete_post(data):
    room = data['roomUrl']
    emit("deletePost", data, to=room)

@socketio.on('deletePostHome')
def delete_post_home(data):
    emit("deletePostHome", data, broadcast=True)

@socketio.on('createComment')
def create_comment(data):
    room = data['roomUrl']
    emit("createComment", data, to=room)

@socketio.on('createCommentHome')
def create_comment_home(data):
    emit("createCommentHome", data, broadcast=True)

@socketio.on('editComment')
def edit_comment(data):
    room = data['roomUrl']
    emit("editComment", data, to=room)

@socketio.on('editCommentHome')
def edit_comment_home(data):
    emit("editCommentHome", data, broadcast=True)

@socketio.on('deleteComment')
def delete_comment(data):
    room = data['roomUrl']
    emit("deleteComment", data, to=room)

@socketio.on('deleteCommentHome')
def delete_comment_home(data):
    emit("deleteCommentHome", data, broadcast=True)

@socketio.on("friends")
def friends_button(data):
    emit("friends", data, broadcast=True)
