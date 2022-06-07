from flask import Blueprint, jsonify
from app.models import Friend

post_routes = Blueprint('friends', __name__)

