from flask import Blueprint, jsonify
from app.models import Post

post_routes = Blueprint('posts', __name__)

