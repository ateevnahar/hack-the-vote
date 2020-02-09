from aylienapiclient import textapi
from newsapi import NewsApiClient

from .Topics import Topics
from .data_types.Article import Article

topics = ["Climate Change", "Immigration", "Terrorism", "Social Security and Medicare", "Student Loans", "Abortion",
          "Gun Control", "Homelessness", "Unemployment"]


class GetData:
    def __init__(self):
        self.newsapi = NewsApiClient(api_key='ddc9ba6a873f4faeadd5142518a7b06d')
        self.client = textapi.Client("28be6b80", "45990ec8045d3747971f0db43b15d356")

    def headlines(self, politician: str):
        results = self.newsapi.get_everything(q=politician, from_param="2020-02-08", to="2020-02-08")
        return results["articles"]

    def analyze_headline(self, articles):
        articles_obj = []
        counter = 0
        for article in articles:
            counter += 1
            if counter > 10:
                break
            summary = self.client.Summarize({'url': article["url"], 'sentences_number': 2})["sentences"]
            if len(summary) > 0:
                topics = self.parse_text(summary[0])
            # topics = self.client.Hashtags({'url': article["url"]})["hashtags"]
            articles_obj.append(Article(article["url"], topics, summary))
        return articles_obj

    def parse_text(self, text: str):
        amount = []
        for topics_list in Topics:
            amount.append(0)
            for topic in topics_list.value:
                if topic in text:
                    amount[len(amount) - 1] += 1

        out = []
        for i in range(0, len(amount) - 1):
            if amount[i] > 0:
                out.append(Topics[i])
        return out
