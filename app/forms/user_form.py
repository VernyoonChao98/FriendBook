from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError

class UserProfileEditForm(FlaskForm):
    bio = StringField("Biography", validators=[DataRequired()])
