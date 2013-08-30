---
layout: post
language: en
author: mehdi
title: Finding twitter influencers
subtitle: making-of the Finn top Belgian journalists on twitter 2013 ranking
description: Walkthrough the collection and analyzis of data to let Finn PR agency publish its yearly ranking of Belgian journalists on twitter
tags: mehdi
# thumbnail: 
# keywords: 
---

<div class="section">
{% capture m %}
A recurring topic 
{% endcapture %}{{ m | markdownify }}</div>
This is the first of a 2 articles series about social media and influence. We review the concepts and stakes in this article, and the second one will dive into a comparison of social media influence systems.
<div class="section">
{% capture m %}
[](id:social-media-influence-101)Social media influence 101 <small> </small>
-----------------------------------------------------

<div class="section">
{% capture m %}
### meet the controversial measure
Ranking people's activity on social media is a recurring topic around the digital marketing world. Klout leads the market of measuring the social influence of individuals. There has been a lot of buzz and hype around it, also controversy around its management of personal data. In general, the concept of measuring "influence" is not well understood by the public, and the opacity of Klout around its methodology has not helped in clarifying how the score is deduced. Competitors like Kred differentiate themselves by being more transparent on the formula they use. We will compare some players in the second article of the series.

The terms influence isn't the best choice. Klout score, or scores provided by Klout's competitors like peerIndex or Kred, actually measure the "potential for influence", i.e. how likely it is that the person's messages are interesting and listened to. This does not necessarily mean that they have an effect on the state of mind reader, which is the notion conveyed by the term "influence".

Actually, **an influence score tells us much more than the number of followers**. The scores put emphasis on the reactions (shares, comments, favorites) by followers/fans to the author's posts. This results in a crowdsourcing of the measure of the content's interest. A user with many followers and publishing a lot of uninteresting content will end up with a lower score than a specialist with lower audience, but publishing high-quality content.

For more details in how influence measurement works, read this article: <a href="http://marketingland.com/can-social-influence-be-distilled-into-a-score-19306" target = "_blank">Can Social Influence Be Distilled Into A Score? Part I, The Potential</a>. 
{% endcapture %}{{ m | markdownify }}</div>

<div class="section">
{% capture m %}
### why you should care about social media influence
**As a consumer of information** from twitter, a Klout score may help select accounts to follow. Of course, you should not follow someone just because they are influential, but if you have a set of accounts tweeting about a topic of interest, this can help you know who posts valuable content.

**As a marketer**, social media influencers connected to your clients are key people. You need to identify who has an important reach to your target markets, and engage in a relationship with these persons. You will have to evaluate profiles on a case-by-case basis and act to make the right influencers become your brand ambassadors.

At Mango Information Systems we think that influence measuring systems are too generic, even when they are broken-down by topic. **A marketer needs to identify influencers amongst each of his customer segments, and measure influence inside his target market**, which is a narrower analysis than Klout & al can do. This is what we are trying to achieve with [tribalytics](http://tribalytics.com), a tool designed to help marketers strategically plan their campaigns with twitter.

**As a social media influencer**, you can get free perks when using Klout, Kred or PeerIndex.

Obviously, common sense is to be used in the interpretation of Klout scores. These do not represent how important or how valuable people are, neither on social media, nor in real life. A great example is at Mobile Vikings, the leading Belgian leading Mobile Internet provider. I recently had the chance to interview Dorien Aerts, Mobile Viking's Chief Marketing Officer. She told me: 

<blockquote>"All our Vikings (customers, Ed.) are equal, and treated equally. This is why we do not take the influence score into account in our customer support software"</blockquote>

They refused to use the feature pushing influencer's support requests at the top of the stack, available in the solution they use.

{% endcapture %}{{ m | markdownify }}</div>

<div class="section">
{% capture m %}
### how to use social media influence scores
Klout and peerIndex have **browser addons**, letting you see the influence scores directly on twitter. Twitter clients like Hootsuite also integrate influence scores by default in their interfaces.

Klout, peerIndex and Kred provide **access to their data via an API** for developers, letting you integrate their analytics inside your applications and your systems. Influence scores are free, and you have to pay to access to extra details like score by topic/category, lists of people influential to a given user, or influenced by a particular user.

Rather than using a global influence score, it is more interesting to find influential people about one specific topic and/or a certain geographic area.


Finn monitors the active Belgian journalists on twitter, and publishes a ranking of the top influencers amongst them every year.
{% endcapture %}{{ m | markdownify }}</div>

{% endcapture %}{{ m | markdownify }}</div>

<hr/>
<hr/>

alternative content - all text below is draft


At Mango Information Systems, we believe that using the term "influence" is bad choice, but that Klout and the competing services do however a good work at measuring potential for influence. <strong>Using their "influence" measure to assess a person's activity on social media still tells much more than looking at the number of followers</strong>. This is because the interactions (replies, retweets, mentions) are taken into account in the scoring. Accounts engaging into conversations with their audience, or sending quality content, will end up with higher influence scores than accounts simply pushing an important volume of outbound communication, even to a large audience.





<div class="section">
{% capture m %}
We have recently helped Finn Public Relations Agency update its yearly ranking of most influent Belgian journalists on twitter. 
(...)
{% endcapture %}{{ m | markdownify }}</div>

<div class="section">
{% capture m %}
[](id:420-to-1500-journalists)From 420 to 1500 journalists <small>how we increased the number of journalists ranked</small>
-----------------------------------------------------

First step of the work was to get data. Finn staff identified a set of twitter lists referencing Belgian journalists. We used [twiLiMe](https://github.com/Mango-information-systems/twiLiMe), a free and open source tool of our creation, to extract all the twitter users referenced in these lists. We obtained approximatly 3000 twitter accounts from this, and let Finn make the editorial choice of filtering it, i.e. decide who corresponds to the definition of "Belgian journalist", and who does not.

As a result, Finn retained 1343 journalists, and 137 media accounts (twitter accounts belonging to a newspaper, radio, TV...).

Next step was to measure the influence of people.
{% endcapture %}{{ m | markdownify }}</div>

<div class="section">
{% capture m %}
[](id:influence-on-twitter)Measuring influence on twitter <small>comparing Klout, Kred and peerIndex</small>
-----------------------------------------------------

The ranking published in 2012 by Finn received some criticism on its methodology, as it used the Klout scores (which combines twitter and facebook influence), and attempted to extract the twitter-part of this score.

This year, Klout does not show the breakdown of twitter and facebook in the score anymore, so anyway another methodology was needed.

For all the journalists, we have extracted the influence score from the three most popular influence ranking systems: Klout, Kred and peerIndex. Measuring "influence" of persons on social media is a controversial topic. If you need to know more about the subject, read this article: [Can Social Influence Be Distilled Into A Score? Part I, The Potential](http://marketingland.com/can-social-influence-be-distilled-into-a-score-19306).

Klout scores take multiple social media accounts into account, and it is not possible to know how the score breaks down. Therefore, using them for our ranking is problematic, as we would compare apples with pears: some users have their Klout score only based on their twitter activity, while other, who have also linked their facebook account in Klout, have their score derived from both social networks.

Kred and peerIndex also measure multiple social media, but they make the break-down available, so it is possible to get the twitter influence score from these services.

Because we were curious on how the algorithms compare, we extracted the three influence scores for all the 2297 journalists we had, and studied about they correlate. Here is what we found out:

Data completeness
	Kred	99.7%
	Klout	97.2%
	peerIndex	74.0%

Much more twitter accounts are referenced in Kred

Correlation

We tested qualitatively the results by picking some profiles for which there was an important difference between the Kred and Klout scores.

Two outstanding accounts, regarding a strong difference between Klout and Kred scores, are:

Oliver Van Vaerenbergh (@OVanVaerenbergh), with a good Klout score: 59 and a smaller Kred score: 263
Maartje Luif (@Zezunja), in the opposite configuration: Klout: 50, Kred: 826


Olivier is quite new on twitter: his account was created on the 19th of March 2013. He has posted less than 60 tweets, so we can understand the low score he gets on Kred. In Klout, we can see that his facebook, google+, linkedIn and youtube accoutns are linked. The Klout score is therefore not driven by the twitter activity, and we can understand that it is high.
http://klout.com/#/OVanVaerenbergh
Maartje Luif, on the other hand, is an active twitter user since 2007, has more than 2000 followers and engages in conversations with the community. Hence, we can understand the high Kred score for her.
In Klout, we can see that only her twitter account is linked. This means that the fact that she has high Kred score and average Klout score is caused by the difference in both system's algorithms.
http://klout.com/#/Zezunja

{% endcapture %}{{ m | markdownify }}</div>
