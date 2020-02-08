class Article:
    def __init__(self, url, topics):
        self.url = url
        self.topics = topics

    def add_issue_topic(self, topics):
        self.topics.append(topics)
