from api.core import Mixin
from .base import db


# Note that we use sqlite for our tests, so you can't use Postgres Arrays
class Candidate(Mixin, db.Model):
    """Email Table."""

    __tablename__ = "candidate"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    website = db.Column(db.String)
    issues = db.Column(db.PickleType)
    articles = db.Column(db.PickleType)
    vote_history = db.Column(db.PickleType)
    image_link = db.Column(db.String)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Email {self.email}>"
