---
layout: post
language: en
title: Authors
subtitle: the people behind these articles
author: Mango Information Systems
description: We blog about web and social media analytics, business intelligence, and data visualization techniques.
keywords: dataviz, bi, business intelligence, visualization, d3, graph, olap, reporting, web analytics, social media analytics, api, competitive analytics, profiling, influence, trends, monitoring
thumbnail: mango-is-blog.png
---

[](id:mehdi)Mehdi El Fadil <small></small>
-----------------------------------------------------

author description

###Latest posts

{% for post in site.tags.mehdi limit:3 %}
####<a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }} <small>{% if post.subtitle %}{{ post.subtitle }}{% endif %} <span class="pull-right">{{ post.date | date_to_string }}</span></small></a>

{% if post.thumbnail %}
<img src="{{ site.baseurl }}/img/thumbnails/{{ post.thumbnail }}" alt=""/>
{% endif %}
{% endfor %}

[](id:gilbert)Gilbert West <small></small>
-----------------------------------------------------

author description

###Latest posts

{% for post in site.tags.gilbert limit:3 %}
####<a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }} <small>{% if post.subtitle %}{{ post.subtitle }}{% endif %} <span class="pull-right">{{ post.date | date_to_string }}</span></small></a>

{% if post.thumbnail %}
<img src="{{ site.baseurl }}/img/thumbnails/{{ post.thumbnail }}" alt=""/>
{% endif %}
{% endfor %}

[](id:panos)Panagiotis Synetos <small></small>
-----------------------------------------------------

Hey stranger! My name is Panos, short version of Panagiotis. I have been around computers my whole life, and they have always intrigued me. So, it was an easy decision on what to choose to do for a living. And since I like what I'm doing, its not just for living, it's also for fun !

Through my professional career, I have been working in big teams, mostly developing and analyzing Web Applications in Coldfusion and Oracle PL/SQL.

The last couple of years, I decided to take a leap of faith and founded Eleven Digit Labs (<a href="http://www.11dig.it" target = "_blank">http://www.11dig.it</a>) along with some good friends of mine. I might be working for smaller projects now, but they are more interesting, to tell you the truth. I've moved on to PHP development (Codeigniter - Laravel for custom web apps), mySQL, Wordpress development (themes - plugins) and recently in Node.js.

Always eager to learn new things, you will find me online coding or studying, unless my almost 2 year-old son is around; he is priority number one.

Linkedin: <a href="http://gr.linkedin.com/in/psynetos" target = "_blank">psynetos</a>  
Skype: panagiotis.synetos  
Phone: +30 211 800 33 16  
Web: <a href="http://www.11dig.it" target = "_blank">www.11dig.it</a>

###Latest posts

{% for post in site.tags.panos limit:3 %}
####<a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }} <small>{% if post.subtitle %}{{ post.subtitle }}{% endif %} <span class="pull-right">{{ post.date | date_to_string }}</span></small></a>

{% if post.thumbnail %}
<img src="{{ site.baseurl }}/img/thumbnails/{{ post.thumbnail }}" alt=""/>
{% endif %}
{% endfor %}
