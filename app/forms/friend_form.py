from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class FriendRequestForm(FlaskForm):
    user_a = IntegerField("UserA", validators=[DataRequired()])
