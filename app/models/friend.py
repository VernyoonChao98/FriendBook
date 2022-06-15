from .db import db
import datetime

class Friend(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    user_a = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_b = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    sender_id = db.relationship("User", foreign_keys=[user_a], backref="sender")
    recipient_id = db.relationship("User", foreign_keys=[user_b], backref="recipient")

    def to_dict(self):
        return {
            'id': self.id,
            'user_a': self.user_a,
            'user_b': self.user_b,
            'status': self.status,
            'created_at': self.created_at,
            'sender_id': self.sender_id.to_dict(),
            'recipient_id': self.recipient_id.to_dict()
        }
