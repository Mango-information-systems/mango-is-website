---
layout: post
language: en
author: mehdi
title: Finding twitter influencers
subtitle: Comparing Klout, Kred and peerIndex
description: Study of three major twitter influence ranking scoring systems. is the quality of a Klout, Kred or peerIndex score comparable?
tags: mehdi
css: blog/css/2013-10-08-finding-twitter-influencers-comparing-klout-kred-and-peerindex.css
scripts: [js/d3.v3.min.js, blog/js/2013-10-08-finding-twitter-influencers-comparing-klout-kred-and-peerindex.js]
thumbnail: blog/img/thumbnails/2013-10-08-finding-twitter-influencers-comparing-klout-kred-and-peerindex.png
prevArticle: finding-twitter-influencers-the-recurring-problem-of-defining-influence.html
# keywords: 
---
<div class="section" markdown="1">

<div id="chartArea" class="span10"></div>
<div class="row-fluid">
	<div class="span10">
		<div id="texts">
			<p> In June 2013, we helped FINN Public Relations agency to establish its 2013 ranking of most influential Belgian journalists on twitter. During this process, a challenge led us to evaluate how Kred and peerIndex compare to Klout.
			</p>
		</div>
		<!--[if lte IE 9]>
			<div>
				<img src="{{ site.url }}/blog/img/fallback/cover-slide.png">
				<img src="{{ site.url }}/blog/img/fallback/1300-journalists.png">
				<h2>Extracting data</h2>
				<p>First, we extracted 1500+ twitter accounts from various twitter lists. Then Finn refined the results, keeping only journalists.</p>
				<img src="{{ site.url }}/blog/img/fallback/journalists-per-klout-score.png">
				<h2>Influence on twitter</h2>
				<p>Then we got the influence scores each person in the list from Klout, the leading social media influence measurement tool.</p>
				<img src="{{ site.url }}/blog/img/fallback/klout-based-on.png">
				<h2>Problem</h2>
				<p>Klout scores are not only based on twitter activity. Klout registered users can link other social profiles (facebook, linkedIn ...) which affects the score. FINN wanted to rank only on twitter influence.</p>
				<img src="{{ site.url }}/blog/img/fallback/klout-vs-kred-vs-peerindex.png">
				<h2>Looking around...</h2>
				<p>So, we had a look at Klout\'s competitors and compared  them to what Klout provides. Both Kred and peerIndex provide a twitter-only score. We had to validate how accurate they were, compared to the Klout measure.</p>
				<img src="{{ site.url }}/blog/img/fallback/scores-shapes-comparison.png">
				<h2>Adding Kred & peerIndex to the mix</h2>
				<p>Kred seemed to provide higher scores than Klout for our dataset, whereas peerIndex assigned relatively lower scores.</p>
				<img src="{{ site.url }}/blog/img/fallback/top5-ranking-comparison.png">
				<h2>Podiums comparison</h2>
				<p>The top 5 journalists for each system were not exactly the same, though some faces are common to all three lists.</p>
				<img src="{{ site.url }}/blog/img/fallback/discarding-peerIndex.png">
				<h2>Removing peerIndex from the equation</h2>
				<p>Because many journalists were missing from peerIndex, we discarded it.</p>
				<img src="{{ site.url }}/blog/img/fallback/correlating-kred-and-klout.png">
				<h2>Kred / Klout correlation</h2>
				<p>Next we studied correlation between the Kred and Klout scores.</p>
				<img src="{{ site.url }}/blog/img/fallback/rank-correlation-coefficient.png">
				<h2>Why we chose Kred for the ranking</h2>
				<p>The high rank correlation coefficient between Klout and Kred shows that Kred is a suitable replacement for Klout in our study; Hence this system was chosen, with the implications on the ranking. <strong>You can find FINN\'s ranking and other interesting results <a href="http://www.finn.be/blogs/top-100-most-influential-belgian-journalists-twitter-2013" target = "_blank">in FINN\'s Blog</a></strong>.</p>
			</div>
			<![endif]-->
	</div>
	<!--[if gt IE 9]><!-->
		<div class="span1" id="next-container"></div>
	<!-- <![endif]-->
	
</div>
<hr/>

This is the second of two articles in a series about social media and influence. First part reviews the [key concepts and issues around social media influence]({{ page.prevArticle }}).

</div>
