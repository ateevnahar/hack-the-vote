import json

import jsonpickle as jsonpickle
from flask import Blueprint, request, render_template, json, Flask
from api.models import db, Person, Candidate, GetData
from api.core import create_response, serialize_list, logger

from sqlalchemy import inspect
import os.path

main = Blueprint("main", __name__, template_folder='templates', static_url_path='/%s',
                 static_folder='static')  # initialize blueprint

data = GetData()

topics_list = ["Climate Change", "Immigration", "Terrorism", "Social Security and Medicare", "Student Loans", "Abortion",
              "Gun Control", "Homelessness", "Unemployment"]

# function that is called when you visit /
@main.route("/")
def index():
    return render_template("homepage.html")


@main.route("/faq")
def faq():
    return render_template("faq/faq.homepage.html")


@main.route("/candidates")
def candidates():
    return render_template("candidates/candidates.homepage.html")

@main.route("/candidates-presidential")
def candidates_presidential():
    return render_template("candidates/candidates-presidential.html")

@main.route("/candidates-local")
def candidates_local():
    return render_template("candidates/candidates-local.html")


@main.route("/quiz")
def quiz():
    return render_template("quiz/quiz.html")


@main.route("/quizhomepage")
def quizhome():
    return render_template("quiz/quizhomepage.html")


@main.route("/api/quiz_topics", methods=["GET"])
def topics():
    return json.dumps(topics_list)


@main.route("/api/save_user", methods=["GET"])
def get_user():
    return render_template("manual/addCustomer.html")


@main.route("/api/save_user", methods=["POST"])
def save_user():
    data = request.form
    if "id" not in data:
        msg = "No id provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)
    if "topics" not in data:
        msg = "No topics provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)
    new_person = Person(cookie=data["id"], saved_topics=[json.loads(data["topics"])])

    # commit it to database
    db.session.add_all([new_person])
    db.session.commit()
    return create_response(
        message=f"Successfully created person {new_person.cookie} with id: {new_person.id}"
    )


# function that is called when you visit /persons
@main.route("/api/persons", methods=["GET"])
def get_persons():
    persons = Person.query.all()
    return create_response(data={"persons": serialize_list(persons)})


@main.route("/api/update_candidate", methods=["GET"])
def update_candidate():
    candidate = Candidate.query.filter_by(id=request.args.get('id')).first()
    return render_template("manual/updateCandidate.html", data=candidate)


@main.route("/api/update_candidate", methods=["POST"])
def update_candidate_post():
    candidate = Candidate.query.filter_by(id=request.args.get('id')).first()

    candidate.id = request.form["id"]
    candidate.name = request.form["name"]
    candidate.website = request.form["website"]
    candidate.issues = json.loads(request.form["issues"])
    candidate.articles = json.loads(request.form["articles"])
    candidate.vote_history = json.loads(request.form["vote_history"])
    candidate.image_link = request.form["image_link"]

    db.session.commit()
    return create_response(
        message=f"Successfully edited person {candidate.name}"
    )


@main.route("/api/save_candidate", methods=["GET"])
def get_candidate():
    return render_template("manual/addCandidate.html")


@main.route("/api/save_candidate", methods=["POST"])
def save_candidate():
    data = request.form
    if "name" not in data:
        msg = "No id provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)

    new_candidate = Candidate(name=data["name"])

    # commit it to database
    db.session.add_all([new_candidate])
    db.session.commit()
    return create_response(
        message=f"Successfully created person {new_candidate.name} with id: {new_candidate.id}"
    )


# function that is called when you visit /persons
@main.route("/api/candidates", methods=["GET"])
def get_candidates():
    candidates = Candidate.query.all()
    return create_response(data={"candidates": serialize_list(candidates)})


@main.route("/analyze", methods=["GET"])
def anaylze_data():
    name = request.args.get('name')
    if name is None:
        msg = "No name provided for search."
        logger.info(msg)
        return create_response(status=422, message=msg)
    lines = data.headlines(name)
    output = data.analyze_headline(lines)

    response = Flask.response_class(
        response=jsonpickle.encode(output),
        status=200,
        mimetype='application/json'
    )
    return response
