class Issue:
    def __init__(self, issue_text, issue_topics):
        self.issue_text = issue_text
        self.issue_topics = issue_topics

    def add_issue_topic(self, issue_topic):
        self.issue_topics.append(issue_topic)
