import json

from flask import Blueprint, request, render_template
from api.models import db, Person, Candidate
from api.core import create_response, serialize_list, logger

from sqlalchemy import inspect
import os.path

main = Blueprint("main", __name__, template_folder='templates', static_url_path='/%s',
                 static_folder='static')  # initialize blueprint


# function that is called when you visit /
@main.route("/")
def index():
    return render_template("homepage/homepage.template.client.html")


@main.route("/faq")
def faq():
    return render_template("faq/faq.homepage.html")


@main.route("/candidates")
def candidates():
    return render_template("candidates/candidates.homepage.html")


@main.route("/quiz")
def quiz():
    return render_template("quiz/quiz.html")


@main.route("/api/quiz_topics", methods=["GET"])
def topics():
    topics = ["Climate Change", "Immigration", "Terrorism", "Social Security and Medicare", "Student Loans", "Abortion",
              "Gun Control", "Homelessness", "Unemployment"]
    return json.dumps(topics)


@main.route("/api/save_user", methods=["GET"])
def get_user():
    return render_template("manual/addCustomer.html")


@main.route("/api/save_user", methods=["POST"])
def save_user():
    data = request.form
    new_person = Person(cookie=data["id"], saved_topics=[json.loads(data["topics"])])

    # commit it to database
    db.session.add_all([new_person])
    db.session.commit()
    return create_response(
        message=f"Successfully created person {new_person.cookie} with id: {new_person.id}"
    )


# function that is called when you visit /persons
@main.route("/persons", methods=["GET"])
def get_persons():
    persons = Person.query.all()
    return create_response(data={"persons": serialize_list(persons)})


# POST request for /persons
@main.route("/make-persons", methods=["GET"])
def create_person():
    data = request.get_json()
    data = {"name": "john", "email": "email@gmail.com"}
    logger.info("Data recieved: %s", data)
    if "name" not in data:
        msg = "No name provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)
    if "email" not in data:
        msg = "No email provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)

    # create SQLAlchemy Objects
    new_person = Person(name=data["name"])
    email = Candidate(email=data["email"])
    new_person.emails.append(email)

    # commit it to database
    db.session.add_all([new_person, email])
    db.session.commit()
    return create_response(
        message=f"Successfully created person {new_person.name} with id: {new_person.id}"
    )
