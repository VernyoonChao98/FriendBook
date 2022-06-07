from flask import Blueprint, jsonify
from app.models import Friend

friend_routes = Blueprint('friends', __name__)
