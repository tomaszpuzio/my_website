from flask import Flask, render_template, request, jsonify
from forms import ContactForm
from flask_mail import Mail, Message
import os

app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get("EMAIL_FROM")
app.config['MAIL_PASSWORD'] = os.environ.get("EMAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
EMAIL_TO = os.environ.get("EMAIL_TO")
mail = Mail(app)


@app.route("/", methods=["GET", "POST"])
def home():
    form = ContactForm()
    if request.method == "POST":
        print(form.email.data, form.message.data, form.name.data)
        if form.validate():
            # title = f"Tomasz - You got message from {form.email.data}!"
            # msg = Message(title, sender=f"My email", recipients=[EMAIL_TO])
            # msg.body = form.message.data
            # mail.send(msg)
            return "Thank you for your message!"
        return jsonify(form.errors)

    return render_template("index.html", form=form)

if __name__ == "__main__":
    app.run(debug=True)
