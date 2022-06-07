from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(1000))
    birthday = db.Column(db.DateTime, nullable=False)
    avatar_url = db.Column(db.String(255))
    banner_url = db.Column(db.String(255))

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    # sender = db.relationship("Friend", back_populates="usera")
    # recipient = db.relationship("Friend", back_populates="userb")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            "birthday": self.birthday,
            "avatar_url": self.avatar_url,
            "banner_url": self.banner_url
        }
