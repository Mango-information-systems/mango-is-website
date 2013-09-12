---
layout: post
language: en
author: mehdi
title: Multi-dimensional exploration of twitter users
subtitle: Introducing twitto.be 0.4
description: The new version of twitto.be allows powerful filtering on topic, location and language, and uses Klout instead of Kred social media influence score.
tags: mehdi
# thumbnail: 
# keywords: 
---
<div class="section" markdown="1">
We have just released a major upgrade of [twitto.be](http://twitto.be). The following changes have been introduced:

* Added multi-dimensional filtering: you can now combine filters on topic, location and language.
* Changed influence measure system: We now use the measures provided by Klout instead of those from Kred.
* Updated categorization system.

Our main goal with this new version was to improve the user experience and let visitors browse the twittos using powerful filters, while providing statistics on the population.

<div class="section" markdown="1">
## New features

<div class="section" markdown="1">
### Powerful filters

![screenshot of twitto.be]({{ site.baseurl }}/img/twitto.be-0.4-screenshot.png "new version of twitto.be")

Three charts are shown at the top of the page, they serve both purposes of **displaying statistics** about the users set and **act as filters**. Indeed, the bars from the bar charts, and the provinces in the map are clickable and trigger filters that update both the list of users and the statistics.

We get interesting insights from them, notably the prevalence of dutch-speaking twittos stands out.

</div>

<div class="section" markdown="1">
### Klout scores and ranks

[Klout](http://klout.com){: target="_blank" } is pionneer in measuring of social media influence. This whole concept is controversial, and for sure accuracy of such measure is relative. One reason why we started using [Kred](http://kred.com){: target="_blank" } for twitto.be is that it provides a twitter-only breakdown of the social influence, whereas Klout may take activity of other social media (Google+, linkedIn, ...) into account for some users.

Kred is not perfect either though. One reproach we can make to it is that it seems to be providing high scores very easily; While this may be flattering for some people, this does not make it easy to identify actual influencers. On the technical side, we also had performance and reliability issues with Kred and had a hard time to maintain scores up-to-date.

We will soon publish a series of post comparing the social media influence measuring systems, stay tuned.

Another change is that ranks of the persons are now shown, aside of the influence score. This will spare people from having to make sometimes complex calculations:

<blockquote class="twitter-tweet"><p>Ranked 11337 out of 90000+ Belgian tweeters ranked by influence - Twitto.be <a href="http://t.co/2n50L6DZOx">http://t.co/2n50L6DZOx</a></p>&mdash; Olivier Gillin (@ogillin) <a href="https://twitter.com/ogillin/statuses/369472789691916288">August 19, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

<div class="section" markdown="1">
### Topics

We have replaced the 5 previous categories by 5 topics, some of them quite generic (entertainment, business), some other more niche (design, health). The reason behind this change is to let us categorize new people more easily.

</div>

</div>

<div class="section" markdown="1">
## Participate

<div class="section" markdown="1">
### Add yourself to the directory

If you are missing from the directory and would like to appear, just use the feedback form on [twitto.be](http://twitto.be), or ping us on [twitter](http://twitter.com/twitto_be) and we will add you. It is free, of course.
</div>

<div class="section" markdown="1">
### Send feedback

We really do value feedback. You can use the comments section below this post, the feedback button directly on [twitto.be](http://twitto.be), or [github issues](https://github.com/Mango-information-systems/twitto_be/issues?state=open) for any remark.
</div>

<div class="section" markdown="1">
### Roll down your own twitter users directory

Twitto.be is open source. **You are free to use our code to create your own directory of twittos**, maybe about a specific topic or around another location. Our [Github repository](https://github.com/Mango-information-systems/twitto_be) contains all the website's code.
</div>

</div>

<div class="section" markdown="1">
## Next steps

While we want to keep maintaining and enhancing twitto.be, we are now focusing on **[tribalytics](http://tribalytics.com)**, a supercharged version of twitto aimed at **helping marketers know their audience better and strategically plan their campaigns for maximum impact**.

</div>

</div>
