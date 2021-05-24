from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import Email, DataRequired

class ContactForm(FlaskForm):
    name = StringField(label="Name", id="contact-form-name", validators=[DataRequired()])
    email = StringField(label="Email Address", id="contact-form-email", validators=[Email(), DataRequired()])
    phone_number = IntegerField(label="Phone number", id="contact-form-phone", validators=[DataRequired()])
    message = StringField(label="Message", id="contact-form-message", validators=[DataRequired()])
    submit = SubmitField(label="Send", id="contact-form-submit")
