---
layout: post
language: en
title: Authors
author: Mango Information Systems
description: We blog about web and social media analytics, business intelligence, and data visualization techniques.
keywords: dataviz, bi, business intelligence, visualization, d3, graph, olap, reporting, web analytics, social media analytics, api, competitive analytics, profiling, influence, trends, monitoring
thumbnail: mango-is-blog.png
---
<div class="section">
{% capture m %}
[](id:mehdi)Mehdi El Fadil <small></small>
-----------------------------------------------------

author description

<div class="section">
{% capture m %}
###Latest posts

{% for post in site.tags.mehdi limit:3 %}
####<a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }} <small>{% if post.subtitle %}{{ post.subtitle }}{% endif %} <span class="pull-right">{{ post.date | date_to_string }}</span></small></a>

{% if post.thumbnail %}
<img src="{{ site.baseurl }}/img/thumbnails/{{ post.thumbnail }}" alt=""/>
{% endif %}
{% endfor %}
{% endcapture %}{{ m | markdownify }}</div>
{% endcapture %}{{ m | markdownify }}</div>
