from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import Email, DataRequired


class ContactForm(FlaskForm):
    name = StringField(
        label="name",
        validators=[DataRequired()],
    )
    email = StringField(
        label="email",
        validators=[
            Email(message="Please provide correct email address"),
            DataRequired()
        ],
    )
    message = TextAreaField(
        label="message",
        validators=[DataRequired()],
    )
    submit = SubmitField(
        label="Send ➔",
    )
