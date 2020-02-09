from api.core import Mixin
from .base import db
from .data_types.Issue import Issue


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

    def make_new(self, website, issues, image_link):
        self.website = website
        self.issues = issues
        self.image_link = image_link

    def __repr__(self):
        return f"<Email {self.email}>"

    topics_list = ["Technology", "Agricultural", "Economy", "LGBTQ Rights", "Gun Control",
                   "Abortion",
                   "Student Loan", "Medicare", "Immigration", "Climate Change"]

    @staticmethod
    def test_data(database):
        candidate1 = Candidate("Donald Trump")
        candidate1.make_new('https://www.donaldjtrump.com/', [
            Issue("Technology", ["Opened up oil and gas production in the U.S.",
                                 "Allocated $50 billion to empower rural America's infrastructure"]),
            Issue("Agricultural", ["Signed the disaster relief bill that provided $19 billion",
                                   "Signed the 2018 Farm Bill which legalized the Production of Industrial Hem"]),
            Issue("Student Loan", ["Implemented the Every Student Succeeds Act (ESSA) to empower states",
                                   "Implemented the year-round distribution of Pell grants"])],
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd"
                            "/Donald_Trump_2013_cropped_more.jpg/220px"
                            "-Donald_Trump_2013_cropped_more.jpg")
        candidate2 = Candidate("Elizabeth Warren")
        candidate2.make_new('https://elizabethwarren.com', [
            Issue("Technology", ["Holding Tech Companies Responsible for the Spread of Disinformation",
                                 "It’s time to break up the biggest tech companies like Amazon, Google, and Facebook"]),
            Issue("Agricultural",
                  ["Guarantee farmers a fair price, reduce overproduction, pay farmers for environmental conservation.",
                   "Ensure Equity for Farmers of Color"]),
            Issue("Student Loan", ["Cancel Student Loan Debt on Day One",
                                   "Quadrupling Title I funding - an additional $450 billion"])],
                            "https://duckduckgo.com/i/8d73105e.jpg")

        candidate3 = Candidate("Bernie Sanders")
        candidate3.make_new('https://berniesanders.com', [
            Issue("Technology", ["Ensure high speed internet for all",
                                 "Break up internet service provider and cable monopolies"]),
            Issue("Agricultural",
                  ["Level the playing field for farmers and farm workers.",
                   "Fundamentally rewrite all of our trade deals to deals to prevent outsourcing "]),
            Issue("Student Loan", ["Guarantee tuition and debt-free public colleges, universities, etc...",
                                   "Invest $1.3 billion every year in private, non-profit historically black colleges"])],
                            "https://duckduckgo.com/i/e8cc1898.jpg")

        candidate3 = Candidate("Joe Biden")
        candidate3.make_new('https://JoeBiden.com', [
            Issue("Technology", ["Install 550,000 charging stations on all new highways ",
                                 "Double amount of spectrum available for wireless broadband"]),
            Issue("Agricultural",
                  ["Revamp trade policy to boost exports, increasing investment in renewable energy and rural broadband",
                   "Protect small and medium-sized farmers and producers by strengthening enforcement of antitrust"]),
            Issue("Student Loan", ["After 20 years of student loan repayment, your federal student loans are forgiven",
                                   "Allow borrowers to discharge their student loans in bankruptcy."])],
                            "https://duckduckgo.com/i/e8cc1898.jpg")

        candidate4 = Candidate("Pete Buttigieg")
        candidate4.make_new('https://www.peteforamerica.com/', [
            Issue("Technology", ["Install 550,000 charging stations on all new highways ",
                                 "Double amount of spectrum available for wireless broadband"]),
            Issue("Agricultural",
                  ["Revamp trade policy to boost exports, increasing investment in renewable energy and rural broadband",
                   "Protect small and medium-sized farmers and producers by strengthening enforcement of antitrust"]),
            Issue("Student Loan", ["After 20 years of student loan repayment, your federal student loans are forgiven",
                                   "Allow borrowers to discharge their student loans in bankruptcy."])],
                            "https://duckduckgo.com/i/1663508a.jpg")

        candidate5 = Candidate("Michael Bloomberg")
        candidate5.make_new('https://MikeBloomberg.com', [
            Issue("Technology", ["Install 550,000 charging stations on all new highways ",
                                 "Double amount of spectrum available for wireless broadband"]),
            Issue("Agricultural",
                  [
                      "Revamp trade policy to boost exports, increasing investment in renewable energy and rural broadband",
                      "Protect small and medium-sized farmers and producers by strengthening enforcement of antitrust"]),
            Issue("Student Loan", ["After 20 years of student loan repayment, your federal student loans are forgiven",
                                   "Allow borrowers to discharge their student loans in bankruptcy."])],
                            "https://duckduckgo.com/i/e8984e57.jpg")

        database.session.add_all([candidate1, candidate2, candidate3, candidate4, candidate5])
        database.session.commit()
