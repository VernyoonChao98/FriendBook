from .db import db
import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    edited = db.Column(db.Boolean, default=False)
    post_image = db.Column(db.String(255))

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at,
            'edited': self.edited,
            'comments': [comment.to_dict() for comment in self.comments],
            'user': self.user.to_dict(),
            'post_images': self.post_image
        }
