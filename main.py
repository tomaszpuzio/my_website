from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from forms import ContactForm
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
Bootstrap(app)


@app.route("/")
def home():
    form = ContactForm()
    return render_template("index.html", contact_form=form)


if __name__ == "__main__":
    app.run(debug=True)
