from api.core import Mixin
from .base import db


class Person(Mixin, db.Model):
    """Person Table."""

    __tablename__ = "person"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    cookie = db.Column(db.String, nullable=False)
    # saved_candidate = db.Column(
    #    db.Integer, db.ForeignKey("person.id", ondelete="SET NULL"), nullable=True
    # )
    saved_topics = db.Column(db.PickleType, nullable=True)
    # emails = db.relationship("Email", backref="emails")

    def __init__(self, cookie: str, saved_topics):
        self.cookie = cookie
        self.saved_topics = saved_topics

    def __repr__(self):
        return f"<Person {self.cookie}>"
