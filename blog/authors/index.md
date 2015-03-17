---
layout: post
language: en
title: Authors
author: Mango Information Systems
description: Mango Information Systems Blog writers
keywords: dataviz, bi, business intelligence, visualization, d3, graph, olap, reporting, web analytics, social media analytics, api, competitive analytics, profiling, influence, trends, monitoring
thumbnail: mango-is-blog.png
license:  ""
---
<div class="section" markdown="1">
## Mehdi El Fadil {#mehdi}

<div class="media">
<img class="media-object pull-left" src="/blog/img/mehdi.png" width="100px" height="100px">
<div class="media-body">
Mehdi El Fadil is an entrepreneur and business intelligence professional. He is currently working in jobs involving extraction and analysis of data from social media, as well as developing a tool helping marketers leverage twitter influencers for their social media campaigns called <a href="http://tribalytics.com"> tribalytics</a>.

</div>
</div>


<div class="section" markdown="1">
###Latest posts

{% for post in site.tags.mehdi limit: 8 %}
{% if post.categories[1] and post.categories[1] != 'drafts' %}
#### <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }} <small>{% if post.subtitle %}{{ post.subtitle }}{% endif %} <span class="pull-right">{{ post.date | date_to_string }}</span></small></a>
{% endif %}
{% endfor %}
</div>
</div>
