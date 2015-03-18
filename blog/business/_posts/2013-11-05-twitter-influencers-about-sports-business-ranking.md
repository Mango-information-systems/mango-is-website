---
layout: post
language: en
title: Twitter influencers about sports business in BE/NL
subtitle: Making-of a ranking
description: What is the methodology to analyze a social media audience? This post dives into the question and shows our approach to find communities and influencers.
author: Mango Information Systems
tags: mehdi
thumbnail: blog/img/thumbnails/2013-11-05-twitter-influencers-about-sports-business-ranking.png
css: blog/css/2013-11-05-twitter-influencers-about-sports-business-ranking.css
scripts: [js/d3.v3.min.js, blog/js/2013-11-05-twitter-influencers-about-sports-business-ranking.js]
---

Yesterday, Jelle Verdoodt from [sportcareers.be](http://sportcareers.be){: target="_blank" } published an [article analyzing the twitter influencers about sports business in Belgium and in the Netherlands](http://www.sportcareers.be/nl/carriereadvies/detail/behoor-jij-tot-de-belangrijkste-influencers-uit-de-sportbusiness-in-belgie-en-nederland-op-twitter){: target="_blank" }, featuring a data analysis and visualization made by us with our tool [Tribalytics](http://tribalytics.com){: target="_blank" }.

Jelle's blog post gathered quite some interest on the social media, and some questions were asked about the methodology used, the relevance and purpose of the analysis. Also, as always when a raking of influencers is presented, some controversy arose.

This post explains the methodology behind the data analysis and the visualization.

<div class="section" markdown="1">

## Visualizing the sports business twitter communities from Belgium and the Netherlands

The purpose of the analysis was to draw the landscape of the twitter account related to sports business - not only sportsmen, but also any business or person related to sports, from Belgium or from the Netherlands.

The main output of the work is a visualization of the top accounts related to the studied topic, broken-down in three communities:

* yellow: professionals in the Belgian sports industry, 
* blue: influencers in Belgian sports, 
* green: professionals and influencers in the Dutch sports industry.

<script src="http://zoom.it/2Ogk.js?width=auto&height=400px"></script>

</div>
<div class="section" markdown="1">

## Approach

[Tribalytics](http://tribalytics.com){: target="_blank" } profiles twitter communities by analyzing the social graph, this means the connections between the twitter accounts. For marketers, social graph analysis is certainly the most powerful techniques to study audiences on social media, for two reasons:

* **segmentation**: it provides a meaningful breakdown of people into communities based on their closeness,
* **virality**: it identifies the accounts that have the most effect in the propagation of your message in the communities you target. 

The following steps are followed to analyse twitter audiences:

1. Tribalytics extracts the social graph of the population to explore, this means all the followers of a given set of accounts central to our topic, and also the follow relationships between all these twitter accounts.
2. This dataset is then analyzed with social network analysis algorithms that perform community detection and measure the social authority of each twitter account.
3. The visualization of the social graph is generated.
4. The graph and community profiles are examined and interpreted.

An extra step Tribalytics takes is text analysis on the descriptions, locations and languages of each community members to provide summarized characteristics of the communities. This feature was not used for the sportCareers data study.

</div>

<div class="section" markdown="1">

## How the list is made

<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/LeslieLaureys">@LeslieLaureys</a> proficiat, maar de dingen zijn soms nogal relatief hé:)</p>&mdash; Sander Carollo (@SanderCarollo) <a href="https://twitter.com/SanderCarollo/statuses/397404142584356864">November 4, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The list of twitter accounts was determined the following way:

First, Jelle has sent us a list of 18 twitter accounts known to be central in the sports business in Belgium or the Netherlands:

|-+-+-|
| @username | # followers | country |
|-+-:+-|
| pvdhoogenband   | 21246 | NL |
| Bovano          |  6386 | NL |
| gerarddielessen |  4847 | NL |
| gijsbregt       |  4720 | NL |
| gonniespijkstra |  4288 | NL |
| FrankvdWallBake |  4130 | NL |
| SportKnowhowXL  |  4103 | NL |
| JustinGoetzee   |  2012 | NL |
| HansSlender     |  1530 | NL |
| tomvangeneugden |  1394 | NL |
| Vannieuwkerke   | 75885 | BE |
| CouckeMarc      |  9903 | BE |
| tomasvds        |  8664 | BE |
| coachvdb        |  8561 | BE |
| hansvdw         |  3529 | BE |
| CedjeVB         |  2263 | BE |
| Sportcareers    |  1838 | BE |
| Bert_VdA        |  1188 | BE |
|-+-+-|
{: .table .table-bordered .table-condensed }

We have extracted all followers information for these 18 accounts, this means **141.160 twitter accounts and 1.659.178 follow relationships**.

Most of these twitter accounts were followers of celebrities @Vannieuwkerke and @pvdhoogenband, and not related at all to our subject of study. We managed to get quality results by only keeping those which were connected to a certain degree with the initial dataset. We got about 6.000 of them, with this technique, leaving highly relevant twitter accounts in the scope of our study. 

A few off-topic twitter accounts remained in the dataset, and also some sports business ones were probably left out, but we are confident about the fact that their number is small, and that the most important ones are within the retained dataset.

<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/Versteegen">@Versteegen</a> mis wel wat grote Nederlandse voetballers in dit rijtje...</p>&mdash; Martin Hersman (@HersmanM) <a href="https://twitter.com/HersmanM/statuses/397457429644181504">November 4, 2013</a></blockquote>
<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/tribalytics">@tribalytics</a> also some big accounts seem missing in NL, especially around football &amp; journalists. thx cc <a href="https://twitter.com/Sportcareers">@Sportcareers</a></p>&mdash; gijsbregt brouwer (@gijsbregt) <a href="https://twitter.com/gijsbregt/statuses/397422281825071104">November 4, 2013</a></blockquote>

The purpose of the study was to analyze the actors of sportCareers target network. It is hence more focused on businesses in the sports industry, rather than sportsmen, which explains why star football players are not in there. Their absence from the list therefore makes sense. If we had done a ranking of most popular sports accounts in social media, which is another topic, these accounts would definitely have been at the top of the ranking. For Belgium, you can see this ranking at [twitto.be](http://twitto.be/?topics=Sport){: target="_blank" } (disclaimer: the list of sportsmen there is still not exhaustive).

Also, have in mind that to keep the data visualization readable, we have chosen to display only the top 30% names (this avoids overlaps of the texts). The missing footballers and journalists are likely to be one of the dots with no name associated to it.


</div>

<div class="section" markdown="1">

## How communities are determined

On twitter, @tomasvds questioned about the difference between the yellow and blue communities:

<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/Sportcareers">@Sportcareers</a> Het verschil professionals/opiniemakers is me niet geheel duidelijk.</p>&mdash; T. Van Den Spiegel (@tomasvds) <a href="https://twitter.com/tomasvds/statuses/397317860218777600">November 4, 2013</a></blockquote>

That question is very relevant: both communities feature twitter accounts from Belgium, and tweeting about business issues around sports. We have journalists, sport professionals, marketers etc. in there. So, why is there a split between them?

One thing to understand is that both the grouping into communities, and the visualization layout (yellow dots together, far from the blue ones), is not a decision of us, but results from automated processing by software, based on the twitter follow relationships between people.

Community detection was performed using the [Louvain method](http://perso.uclouvain.be/vincent.blondel/research/louvain.html){: target="_blank" }, and was used to color the dots.

Layout algorithm makes **dots of persons highly connected attract each other, and dots of persons not following each other repulse**.

The chart below highlights the configuration of our graph by showing that **most of the connections are within communities, not between communities**.

<div id="charts-container"></div>

**Number of follow connections by community**
{: .text-center }

**So, why is there this distinction between accounts**?  Because, in real life, these are two actual communities, they are connected together, but some groups of people are closer to each other. **You can think of them as two departments in a company**. The yellow community rather groups B2B people, as the blue is composed more of professional (ex-)sportsmen and journalists.

</div>
<div class="section" markdown="1">

## How is a person's authority measured

Unlike social influence measurement systems like Klout, we do not measure people's "influence", but instead use social network analysis to identify the specialists in their community. The algorithm, called HITS, is similar to Google's pageRank, but we apply on persons instead of web pages. The [Wikipedia article](http://en.wikipedia.org/wiki/HITS_algorithm){: target="_blank" } about it is a good starting point to get its logic.

The concept is to **assess the score of one person according to the score of his connections**.

The **authority measure is relative to the studied graph**. Someone with a low authority in one graph analysis should not be worried about it, he might very well have a very high one in another dataset, focused on another specialization or another geographical location.

Authority measure is more useful than scores like Klout when studying communities, because of this relativity. **Klout score will always highlight celebrities, global or local**, regardless of whether they are relevant to your topic, whereas **the authority measure is much more fine-grained**.

<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/Sportcareers">@Sportcareers</a> <a href="https://twitter.com/BasSchnater">@BasSchnater</a> <a href="https://twitter.com/SPORTNEXT">@SPORTNEXT</a> Het is &#39;n krankzinnig + subjectief lijstje. Punten scoren door meer mensen te volgen, lekker makkelijk</p>&mdash; Peter Hopstaken (@SportKnowhowXL) <a href="https://twitter.com/SportKnowhowXL/statuses/397400160679911424">November 4, 2013</a></blockquote>

**Authority is not a measure of your number of followers** or following (that one is called the degree measure). Authority is really based on the quality of your network, as the followers of your followers enter into account in your own scoring. Therefore, **it is really your position in the graph which is being measured**.

<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/HersmanM">@HersmanM</a> <a href="https://twitter.com/Versteegen">@Versteegen</a> Turngrootheid <a href="https://twitter.com/epkez">@epkez</a> twittert nauwelijks. Dan zal de invloed ook wel tegenvallen.</p>&mdash; John Volkers (@johnvolkers) <a href="https://twitter.com/johnvolkers/statuses/397462069668110336">November 4, 2013</a></blockquote>

It's not about the quantity of tweets, but really the quality of the connections of twitter accounts within the targeted group of people. @epzek has quality connections within the studied graph, which explains his score, which is not top but above average. Think of it as: **one tweet of @epzek will appear on the timelines of key people** in the blue and green communities, and are therefore **more likely to propagate an information than a tweet of a person who tweets often but is not connected** with the sports business industry.

</div>

<div class="section" markdown="1">

## How to use the analysis

<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/activatiOns">@activatiOns</a>  ik ben er ook nog niet helemaal uit wat ik ervan moet vinden en waarom mijn naam staat waar ie staat...</p>&mdash; Hester Ozinga (@HesterOz) <a href="https://twitter.com/HesterOz/statuses/397453114296770560">November 4, 2013</a></blockquote>

The visualization (or communities summarized report in Tribalytics) is a good way to **explore who is who in the communities** that interest you. Digital marketers can use this information to get to know **who exactly is likely to make their campaigns resonate within a niche** they want to target. This is a way to maximize the company's investment in social media. An article from the MIT Technology review: [US Military Scientists Solve the Fundamental Problem of Viral Marketing](http://www.technologyreview.com/view/519361/us-military-scientists-solve-the-fundamental-problem-of-viral-marketing/){: target="_blank" }.

For Jelle, the visualization is useful as it show him the positive result of his social media strategy, and his high engagement within the segments that are key for his startup.

Gijsbregt Brouwer has asked a very important and very relevant question in a [repost of the analysis on sportnext.nl](http://www.sportnext.nl/berichten/de_meest_invloedrijke_twitteraccounts_in_sportbusiness_uit_nederland){: target="_blank" }, about how to increase your own rank, and whether there is a point in this. This can be the starting point of a very long debate, we will keep it brief in this article.

We think that people should not attach too much importance about rankings and influence scores. However, it is crucial to be connected to the right people, within the right segments. You should be able to rely not only on your own social media influence, but the one of influencers advocating your brand inside their communities.

Therefore our recommendation: don't focus on your own influence scores. Be genuine, **know your target audience, and engage with the right people there**.

</div>

That's about it, you can let me know in case you have more questions by commenting below.

P.S.: If you use Twitter for your business and need to profile your industry's audience, sign up to [Tribalytics](http://tribalytics.com), we will be opening new slots for the beta testing program very soon.
