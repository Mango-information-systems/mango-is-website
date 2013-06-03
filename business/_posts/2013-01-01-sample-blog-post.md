---
# static properties
layout: post
# mandatory variables
language: en
title: sample blog post
description: test blog post
author: Mango Information Systems
description: We blog about web and social media analytics, business intelligence, and data visualization techniques.
tags: engineering
# optional
subtitle: this is a subtitle
thumbnail: test.png
# date only to be specified if post is updated
date: 2013-03-06
# in case of series, include previous/following articles titles:
# prevArticle: 2013-3-01-previous-article-title
# nextArticle: 2013-3-01-following-article-title
keywords: one, two
---

This is a sample blog post page. Heading will automatically appear above this text, using title and subtitle metadata specified in the .md front matter

sub-heading <small>this is a sub-title like i like them </small>
-----------------------------------------------------

whatever markdown goes wherever

[Internal link here](http://mango-is.com/contact/)

<a href="http://daringfireball.net/projects/markdown/syntax" target = "_blank">External link here: Markdown syntax guide</a>
(in plain html to use target="_blank")

<div class="row">
	<div class="span6">
		<p>HTML tags are supported within markdown</p>
	</div>
	<div class="span6">
		<p>so that we can do more complex stuff, including playing around with javascripts & client side data visualizations/interactions</p>
	</div>
</div>

An image should show up here: 

{% image test.png %}
  title: This is just a test title.
  alt: this is the alt text
{% endimage %}

alt attribute is supported, title also

all images are to be stored in subfolder img, thumbnails in img/thumbnails

Code highlighting should work:

{% highlight javascript %}
// formatting mySQL timestamps
// taken from http://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString()
    if(-10 < d && d < 0) return "-0" + (-1*d).toString()
    return d.toString()
}
{% endhighlight %}
