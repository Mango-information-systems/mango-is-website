---
layout: post
language: en
author: mehdi
title: Hello World
subtitle: intro to Mango Information Systems' blog
description: Introductory post of Mango Information System's blog. We introduce our topics and authors, and our view of how corporate blogging should be done
tags: mehdi
# thumbnail: 
# keywords: 
---
<div class="section">
{% capture m %}
Hello, and welcome to our blog.

I am opening this space to share views on the worlds of analytics, business intelligence, and data vizualizations. My goal here is to build a knowledge base of the topics around analytics, and comment on trends, solutions, and practices. Guests will be writing here with me, they are experts with whom I am working on several projects.
{% endcapture %}{{ m | markdownify }}</div>

<div class="section">
{% capture m %}
[](id:us)Us <small>who we are </small>
-----------------------------------------------------
<div class="section">
{% capture m %}
###Company

Mango Information Systems' core business is to provide businesses active the web with deep insights helping them take better decisions. To do this, we combine the power of business intelligence concepts - good ol' data-warehousing - and the beauty of web technologies - social media, cloud computing and big data, beyond the buzzwords.

(put image here, - metaphoric? - about BI, the web, and us as combining both)

We are building a twitter analytics tool called [tribalytics](http://tribalytics.com), it segments your market and helps you better plan your campaigns, you should [check it out !](http://tribalytics.com)

{% endcapture %}{{ m | markdownify }}</div>
<div class="section">
{% capture m %}
###Authors

(add pics and shot bio, + link to authors page)

####Mehdi El Fadil

####Gilbert West

####Panagiotis Synetos
{% endcapture %}{{ m | markdownify }}</div>
{% endcapture %}{{ m | markdownify }}</div>

<div class="section">
{% capture m %}
[](id:focus)Focus <small>what, why, and how we write </small>
-----------------------------------------------------

The main <em>raison-d'être</em> of this blog is to show businesses the ways how they can make use of their data, and the value it is possible to get from it.

We also want to fill the gap between practices of corporate business intelligence on one hand, and web/social media analytics on the other hand. Both worlds coexist independently without interacting with each other, and good practices applied on one side do not often reach the other one, even it they would benefit from them.

The blog contains two sections, aimed at two distinct audiences:

* [business]({{ site.url }}{{ site.baseurl }}/business/) tackles actual analytics problems, and details solutions to solve them, from a functional perspective
* [engineering]({{ site.url }}{{ site.baseurl }}/engineering/) explore the coding and technical aspects.

####Two blogs in one

<table class="table table-bordered">
	<thead>
		<tr>
			<th></th>
			<th>Business</th>
			<th>Engineering</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Purpose <small>why we write</small></td>
			<td>showcase how to take better decisions using analytics</td>
			<td>spread knowledge about best practices in business intelligence and web/social media analytics</td>
		</tr>
		<tr>
			<td>Audience <small>who it is for</small></td>
			<td>marketers, community managers and analysts</td>
			<td>web developers, designers and business intelligence professionals</td>
		</tr>
		<tr>
			<td>Topics <small>what it is about</small></td>
			<td colspan = "2">social media analytics, monitoring, news aggregation, data-warehousing, data integration, data visualization, public data, big data, multidimensional analysis and faceted navigation</td>
		</tr>
	</tbody>
</table>

We will try our best to remain concise, visual, and interactive. This is to let you get quickly to the point and save some of your time :).
{% endcapture %}{{ m | markdownify }}</div>


<div class="section">
{% capture m %}
[](id:participate)Participate <small>have your say! </small>
-----------------------------------------------------
<div class="section">
{% capture m %}
###Re-use

We think that ideas are meant to be spread, therefore we license our blog content (texts and visuals) under a Creative Commons Attribution license. **You are free to quote, copy, modify, republish the content**, even for commercial purpose, as long as you attribute to us the paternity of the article.

Suitable attribution is the following mention, preferably including a hyperlink to our website: "source: [Mango Information Systems](http://mango-is.com), shared under Creative Commons CC BY license"

html code to produce this attribution is:

{% highlight html %}
source: <a href="http://mango-is.com">Mango Information Systems</a>, shared under Creative Commons CC BY license
{% endhighlight %}

If you have performed modifications, you might rather use "based on an original content authored by [Mango Information Systems](http://mango-is.com), shared under Creative Commons CC BY license"

html code to produce this attribution is:

{% highlight html %}
based on an original content authored by <a href="http://mango-is.com">Mango Information Systems</a>, shared under Creative Commons CC BY license
{% endhighlight %}

This licensing policy does not apply to third-party content we will share. Also, some blog posts might be licensed under different conditions, in such case licensing conditions will be detailed in the article's page.
{% endcapture %}{{ m | markdownify }}</div>

<div class="section">
{% capture m %}
###Discuss

Every feedback is welcome, and we want to encourage public's participation and debate. Please comment to the articles, and if you want, use the [contact page]({{ site.url }}/contact/).
{% endcapture %}{{ m | markdownify }}</div>
{% endcapture %}{{ m | markdownify }}</div>
