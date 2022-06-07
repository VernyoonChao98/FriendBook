from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class PostCreateForm(FlaskForm):
    user_id = IntegerField("User", validators=[DataRequired()])
    content = StringField("Content", validators=[DataRequired()])

    def validate_content(form, field):
        if len(field.data) < 1:
            raise ValidationError("Post must have content!")
        if len(field.data) > 1000:
            raise ValidationError("Post cannot be bigger than 1000 Characters.")
