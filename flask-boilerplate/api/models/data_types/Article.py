class Article:
    def __init__(self, url, topics, summary):
        self.url = url
        self.topics = topics
        self.summary = summary

    def add_issue_topic(self, topics):
        self.topics.append(topics)
