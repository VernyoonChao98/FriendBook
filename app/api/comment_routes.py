from flask import Blueprint, jsonify
from app.models import Comment

post_routes = Blueprint('comments', __name__)
