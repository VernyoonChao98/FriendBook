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

@socketio.on('updatedBanner')
def updated_banner(data):
    room = data['roomUrl']
    emit("updatedBanner", data, to=room)

@socketio.on('createPost')
def create_post(data):
    room = data['roomUrl']
    emit("createPost", data, to=room)

@socketio.on('createComment')
def create_comment(data):
    room = data['roomUrl']
    emit("createComment", data, to=room)
