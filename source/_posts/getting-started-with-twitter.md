---
# static properties
layout: slides
# mandatory variables
language: en
title: Getting started with Twitter
description: Slide deck of the Getting started with Twitter workshop - December 2nd 2014, @Betacowork
author: Mango Information Systems
## tags is used to mention the author, do not use for actual tagging
tags: mehdi
# optional
subtitle: Using social media for sales conversions
thumbnail: img/blog/thumbnails/2014-12-02-getting-started-with-twitter.png
csss: [css/reveal.min.css, css/reveal.tribalytics.css, css/foundation.min.css, blog/css/2014-12-02-getting-started-with-twitter.css]
scripts: [js/utils/head.min.js, js/reveal.min.js, js/d3.v3.min.js, js/d3.customCategories.js, blog/js/2014-12-02-getting-started-withTwitter.js]
---

<div class="reveal">

	<!-- Any section element inside of this container is displayed as a slide -->

	<div class="slides">
		
		<!-- Cover slide -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<br><br><br><br>
			<h2 style="background: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%,rgba(255,255,255,1) 30%,rgba(255,255,255,0) 100%);">Getting started with twitter</h2>
			<br><br><br><br>
			<p>
				<small>Mehdi El Fadil - <a href="https://twitter.com/me_bx" target = "_blank">@me_bx</a></small>
				<br>
				<a href="http://tribalytics.com/?utm_source=mango-is&utm_medium=blog&utm_campaign=twitter-workshop-slides" target = "_blank"><img src="{{ site.url }}/blog/img/tribalytics-logo.png" style="border:none; background:none; box-shadow:none;height:35px;"></a>
			</p>
			<br><br>
			<div class="row">
				<div class="small-8 small-offset-4 columns">
					<small>Press the space bar or click on the blue arrow to see the next slide</small>
				</div>
			</div>
		</section>
		
		<!-- Who are you -->
		<!-- entrepreneurs, freelancers, employees, a bit of everything... -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Who are we</h3>
				<div id="profiles-barchart"></div>
				<br>
				<form id="profile-form" style="display:none;">
					<div class="row">
						<div class="small-4 columns">
							<span id="profile-label"></span>
						</div>
						<div class="small-2 columns end">
							<input id="profile-val" type="number" min="0" placeholder="count" />
						</div>
					</div>
				</form>
			</div>
		</section>
		
		<!-- Plan -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Let's discuss about</h3>
				<ol>
					<li>Twitter in context</li>
					<li>Twitter 101</li>
					<li>Rest of the program</li>
				</ol>
			</div>
		</section>
		
		<!-- Part 1 -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h2>Twitter in context</h2>
			</div>
		</section>
		
		<!-- Why use twitter -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Why use twitter</h3>
				<!-- d3.js crowdsourced barchart-->
				<div id="purposes-barchart"></div>
				<br><br>
				
				<form id="purposes-form">
					<div class="row">
						<div class="small-3 columns">
							<label for="purpose-name" class="right inline">Add purpose</label>
						</div>
						<div class="small-4 columns">
							<input id="purpose-name" type="text" placeholder="purpose name" />
						</div>
						<div class="small-2 columns end">
							<input id="purpose-val" type="number" min="0" placeholder="count" />
						</div>
					</div>
					<div class="row">
						<!-- workaround to avoid tab space breaking slide position-->
						<div tabindex="0"></div>
					</div>
				</form>
			</div>
		</section>
		
		<!-- Two approaches: awareness (Return on engagement) vs conversions (ROI) -->
		<!-- summary of the previous slides -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Pick your team</h3>
				<br>
				<h4>ROE <small>Return on Engagement</small></h4>
				<p><small>vs</small></p>
				<h4>ROI <small>Return on Investment</small></h4>
			</div>
		</section>
		
		<!-- Conversions funnel -->
		<section data-state="funnel" data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div id="conversions-funnel">
				<h3>Business conversions funnel</h3>
				<svg width="700" height="500" preserveAspectRatio="xMinYMin" viewbox="0 0 700 500"><g transform="translate(40,20)"><g><path class="link" d="M223.33333333333334,147.1740538957128C320,147.1740538957128 320,185.89414522351075 416.6666666666667,185.89414522351075" style="stroke: #FFC300; stroke-width: 121.61016949152543;"><title>70 people in Blog moved to Website</title></path><path class="link" d="M15,95.55084745762713C111.66666666666667,95.55084745762713 111.66666666666667,129.8011725397806 208.33333333333334,129.8011725397806" style="stroke: #3369E8; stroke-width: 86.86440677966102;"><title>50 people in Google search moved to Blog</title></path><path class="link" d="M431.6666666666667,142.46194183368027C528.3333333333334,142.46194183368027 528.3333333333334,276.59514968560825 625,276.59514968560825" style="stroke: #FF7600; stroke-width: 69.49152542372882;"><title>40 people in Website moved to Online purchase</title></path><path class="link" d="M15,423.9406779661017C215.83333333333334,423.9406779661017 215.83333333333334,368.3093994607989 416.6666666666667,368.3093994607989" style="stroke: black; stroke-width: 52.11864406779661;"><title>30 people in Adwords moved to Website</title></path><path class="link" d="M15,299.70338983050846C111.66666666666667,299.70338983050846 111.66666666666667,234.0384606753738 208.33333333333334,234.0384606753738" style="stroke: #3b5998; stroke-width: 52.11864406779661;"><title>30 people in facebook moved to Blog</title></path><path class="link" d="M15,26.059322033898304C215.83333333333334,26.059322033898304 215.83333333333334,99.02973844384974 416.6666666666667,99.02973844384974" style="stroke: #3369E8; stroke-width: 52.11864406779661;"><title>30 people in Google search moved to Website</title></path><path class="link" d="M15,209.78813559322035C111.66666666666667,209.78813559322035 111.66666666666667,190.6062572855433 208.33333333333334,190.6062572855433" style="stroke: #00aced; stroke-width: 34.74576271186441;"><title>20 people in twitter moved to Blog</title></path><path class="link" d="M15,175.04237288135593C215.83333333333334,175.04237288135593 215.83333333333334,264.07211132520564 416.6666666666667,264.07211132520564" style="stroke: #00aced; stroke-width: 34.74576271186441;"><title>20 people in twitter moved to Website</title></path><path class="link" d="M15,353.135593220339C215.83333333333334,353.135593220339 215.83333333333334,324.87719607096835 416.6666666666667,324.87719607096835" style="stroke: #00a478; stroke-width: 34.74576271186441;"><title>20 people in Vine moved to Website</title></path><path class="link" d="M431.6666666666667,90.34329776588365C528.3333333333334,90.34329776588365 528.3333333333334,186.6798954483201 625,186.6798954483201" style="stroke: #FF7600; stroke-width: 34.74576271186441;"><title>20 people in Website moved to Contact form</title></path><path class="link" d="M15,260.614406779661C215.83333333333334,260.614406779661 215.83333333333334,294.474653698087 416.6666666666667,294.474653698087" style="stroke: #3b5998; stroke-width: 26.059322033898304;"><title>15 people in facebook moved to Website</title></path><path class="link" d="M223.33333333333334,216.6655793194416C424.16666666666663,216.6655793194416 424.16666666666663,212.7392174822184 625,212.7392174822184" style="stroke: #FFC300; stroke-width: 17.372881355932204;"><title>10 people in Blog moved to Contact form</title></path><path class="link" d="M223.33333333333334,234.0384606753738C424.16666666666663,234.0384606753738 424.16666666666663,320.0273530754388 625,320.0273530754388" style="stroke: #FFC300; stroke-width: 17.372881355932204;"><title>10 people in Blog moved to Online purchase</title></path><path class="link" d="M15,379.19491525423734C111.66666666666667,379.19491525423734 111.66666666666667,268.7842233872382 208.33333333333334,268.7842233872382" style="stroke: #00a478; stroke-width: 17.372881355932204;"><title>10 people in Vine moved to Blog</title></path><path class="link" d="M15,232.3728813559322C320,232.3728813559322 320,226.63752256696418 625,226.63752256696418" style="stroke: #00aced; stroke-width: 10.423728813559322;"><title>6 people in twitter moved to Contact form</title></path><path class="link" d="M15,143.3262711864407C320,143.3262711864407 320,164.96379375340487 625,164.96379375340487" style="stroke: #3369E8; stroke-width: 8.686440677966102;"><title>5 people in Google search moved to Contact form</title></path></g><g><g class="node" transform="translate(0,0)"><rect height="147.66949152542372" width="15" style="fill: #3369E8; stroke: #183371;"><title>85 people
in Google search</title></rect><text x="21" y="73.83474576271186" dy=".35em" text-anchor="start">Google search</text></g><g class="node" transform="translate(0,397.8813559322034)"><rect height="52.11864406779661" width="15" style="fill: black; stroke: #000000;"><title>30 people
in Adwords</title></rect><text x="21" y="26.059322033898304" dy=".35em" text-anchor="start">Adwords</text></g><g class="node" transform="translate(0,247.58474576271186)"><rect height="78.17796610169492" width="15" style="fill: #3b5998; stroke: #1c2b4a;"><title>45 people
in facebook</title></rect><text x="21" y="39.08898305084746" dy=".35em" text-anchor="start">facebook</text></g><g class="node" transform="translate(0,157.66949152542372)"><rect height="79.91525423728814" width="15" style="fill: #00aced; stroke: #005474;"><title>46 people
in twitter</title></rect><text x="21" y="39.95762711864407" dy=".35em" text-anchor="start">twitter</text></g><g class="node" transform="translate(0,335.7627118644068)"><rect height="52.11864406779661" width="15" style="fill: #00a478; stroke: #00503a;"><title>30 people
in Vine</title></rect><text x="21" y="26.059322033898304" dy=".35em" text-anchor="start">Vine</text></g><g class="node" transform="translate(208.33333333333334,86.36896914995009)"><rect height="191.10169491525423" width="15" style="fill: #FFC300; stroke: #7c5f00;"><title>110 people
in Blog</title></rect><text x="21" y="95.55084745762711" dy=".35em" text-anchor="start">Blog</text></g><g class="node" transform="translate(416.6666666666667,72.97041640995144)"><rect height="321.39830508474574" width="15" style="fill: #FF7600; stroke: #7c3900;"><title>185 people
in Website</title></rect><text x="-6" y="160.69915254237287" dy=".35em" text-anchor="end">Website</text></g><g class="node" transform="translate(625,160.6205734144218)"><rect height="71.22881355932203" width="15" style="fill: red; stroke: #7c0000;"><title>41 people
in Contact form</title></rect><text x="-6" y="35.61440677966102" dy=".35em" text-anchor="end">Contact form</text></g><g class="node" transform="translate(625,241.84938697374383)"><rect height="86.86440677966102" width="15" style="fill: red; stroke: #7c0000;"><title>50 people
in Online purchase</title></rect><text x="-6" y="43.43220338983051" dy=".35em" text-anchor="end">Online purchase</text></g></g><g><text transform="translate(0,470)">public</text><text transform="translate(290,470)">visitor/prospect</text><text transform="translate(580,470)">lead/client</text></g></g></svg>
			</div>
		</section>
		
		<!-- Part 2 -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h2>Twitter 101</h2>
			</div>
		</section>
		
		<!-- Twitter basics -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Twitter basics</h3>
				<blockquote class="twitter-tweet" width="550"><p>just setting up my twttr</p>— Jack (@jack) <a href="https://twitter.com/jack/status/20">March 21, 2006</a></blockquote>
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
		</section>
		
		<!-- Twitter specificities -->
		<!-- Twitter asymetric, public, ecosystem via API -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>What's special about Twitter</h3>
				<ol>
					<li>That's where news break <small> because it's real time + public</small></li>
					<li>Connects people, breaks silos</li>
					<li>Hackable <small>make twitter work for you</small></li>
				</ol>
			</div>
		</section>
		
		<!-- Phenomena -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Twitter use cases & phenomena</h3>
				<div id="twitter-case" class="row">
					<div class="small-3 columns"><a href="https://twitter.com/KLM/with_replies" target="_blank">@KLM Support</a></div>
					<div class="small-3 columns"><a href="https://twitter.com/acarvin" target="_blank">@acarvin</a></div>
					<div class="small-3 columns"><a href="https://twitter.com/betacowork" target="_blank">betacowork</a></div>
					<div class="small-3 columns"><a href="https://twitter.com/search?q=%23tedxbrussels&src=tyah" target="_blank">#tedXBrussels</a></div>
					<div class="small-3 columns"><a href="https://twitter.com/search?f=realtime&q=%23durftevragen&src=tyah" target="_blank">#durftevragen</a></div>
					<div class="small-3 columns"><a href="https://twitter.com/search?f=realtime&q=%23teamfollowback&src=tyah" target="_blank">#teamfollowback</a></div>
					<div class="small-3 columns"><a href="https://twitter.com/bernardpivot1" target="_blank">@bernardpivot1<small>(French)</small></a></div>
				</div>
				<br><br>
				<form id="cases-form">
					<div class="row">
						<div class="small-3 columns">
							<label for="case-name" class="right inline">Add case</label>
						</div>
						<div class="small-4 columns">
							<input id="case-name" type="text" placeholder="case name" />
						</div>
						<div class="small-5 columns end">
							<input id="case-url" type="text" placeholder="case URL" />
						</div>
					</div>
					<div class="row">
						<!-- workaround to avoid tab space breaking slide position-->
						<div tabindex="0"></div>
					</div>
				</form>
			</div>
		</section>
		
		<!-- Tools -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Tools that can help you</h3>
				<div id="twitter-tool" class="row">
					<div class="small-3 columns"><a href="https://hootsuite.com/" target="_blank">Hootsuite</a></div>
					<div class="small-3 columns"><a href="https://about.twitter.com/products/tweetdeck" target="_blank">TweetDeck</a></div>
					<div class="small-3 columns"><a href="https://ifttt.com/" target="_blank">IFTTT</a></div>
					<div class="small-3 columns"><a href="http://commun.it" target="_blank">commun.it</a></div>
					<div class="small-3 columns"><a href="http://followerwonk.com/" target="_blank">followerwonk</a></div>
				</div>
				<br><br>
				<form id="tools-form">
					<div class="row">
						<div class="small-3 columns">
							<label for="tool-name" class="right inline">Add tool</label>
						</div>
						<div class="small-4 columns">
							<input id="tool-name" type="text" placeholder="tool name" />
						</div>
						<div class="small-5 columns end">
							<input id="tool-url" type="text" placeholder="tool URL" />
						</div>
					</div>
					<div class="row">
						<!-- workaround to avoid tab space breaking slide position-->
						<div tabindex="0"></div>
					</div>
				</form>
			</div>
		</section>
		
		<!-- Part 3 -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h2>Rest of the program</h2>
			</div>
		</section>
		
		<!-- How about professionals -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Top challenges faced by marketers</h3>
				<br>
				<p>
					<ol>
						<li>Generating Awareness and Driving Traffic</li>
						<br>
						<li>Targeting Effectively</li>
						<br>
						<li>Using Social Media to Generate Customers and Revenue</li>
						<br>
						<li>Keeping Up With Marketing Trends and Strategies</li>
						<br>
						<li>Increasing and Proving ROI</li>
					</ol>
				</p>
				<small>source: <a href="http://blog.hubspot.com/blog/tabid/6307/bid/33820/5-Major-Challenges-Marketers-Face-And-How-to-Solve-Them.aspx" target="_blank">hubspot.com</a></small>
			</div>
		</section>
		
		<!-- Tactics: how can you get noticed -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Tactics: how to get noticed</h3>
				<div id="twitter-tactic" class="row">
				</div>
				<br><br>
				<form id="tactics-form">
					<div class="row">
						<div class="small-3 columns">
							<label for="tactic-name" class="right inline">Add tactic</label>
						</div>
						<div class="small-4 columns">
							<input id="tactic-name" type="text" placeholder="tactic name" />
						</div>
						<div class="small-5 columns end">
							<input id="tactic-url" type="text" placeholder="tactic URL" />
						</div>
					</div>
					<div class="row">
						<!-- workaround to avoid tab space breaking slide position-->
						<div tabindex="0"></div>
					</div>
				</form>
			</div>
		</section>
		<!-- How your audience looks like -->
<!--
		<section>
			<div>
				<!-- d3.js crowdsourced barchart-->
<!--
			</div>
		</section>
-->
		
		<!-- Behind the scenes: how information flows -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<h3>Social Graph <small>- visualizing the information flow</small></h3>
			<div id="cmnty"></div>
		</section>
		
		<!-- Hotels use case 1 -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<h3 style="color:#999"><em>(undisclosed)</em></h3>
			<div class="row">
				<div class="small-6 columns">
					<img src="{{ site.url }}/blog/img/undisclosed-hotel-graph.png" width="400px" style="vertical-align:top">
				</div>
				<div class="small-6 columns fragment">
					<div style="max-width:400px; text-align:left;">
						<p>Luxury hotel</p>
						<p>1000 followers</p>
						<p><span style="padding-left:15px; background-color:rgba(31, 84, 180, 1)"> </span><span style="margin-left: 10px;">Hospitality industry</span></p>
						<p><span style="padding-left:15px; background-color:rgba(255, 99, 14, 1)"> </span><span style="margin-left: 10px;">People from Brussels</span></p>
						<p><span style="padding-left:15px; background-color:rgba(71, 160, 44, 1)"> </span><span style="margin-left: 10px;">Other hotels of the group</span></p>
					</div>
				</div>
			</div>
			

			<aside class="notes">
				<p>Then as a second example let's compare the followers of two luxury hotels in Brussels.</p>
				<p>The first hotel is followed by the hundred of hotels belonging to the same group. This increases the number of followers but doesn't serve any other purpose.</p>
				<p>The orange community also is not really relevant: locals are not customers.</p>
			</aside>
		</section>
		
		<!-- Hotels use case 2 -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<h3>@theHotelBxl</h3>
			
			<div class="row">
				<div class="small-6 columns">
					<img src="{{ site.url }}/blog/img/thehotelbxl-graph.png" width="400px" style="vertical-align:top">
				</div>
				<div class="small-6 columns fragment">
					<div style="max-width:400px; text-align:left;">
						<p>Luxury hotel</p>
						<p>1500 followers</p>
						<p><span style="padding-left:15px; background-color:rgba(31, 84, 180, 1)"> </span><span style="margin-left: 10px;">Travel bloggers</span></p>
						<p><span style="padding-left:15px; background-color:rgba(255, 99, 14, 1)"> </span><span style="margin-left: 10px;">Brussels tourism</span></p>
						<p><span style="padding-left:15px; background-color:rgba(71, 160, 44, 1)"> </span><span style="margin-left: 10px;">Marketers</span></p>
						<p><span style="padding-left:15px; background-color:rgba(255, 167, 14, 1)"> </span><span style="margin-left: 10px;">Fashion bloggers</span></p>
						<p><span style="padding-left:15px; background-color:rgba(214, 39, 40, 1)"> </span><span style="margin-left: 10px;">Hospitality industry</span></p>
						<p><span style="padding-left:15px; background-color:#17cfb3"> </span><span style="margin-left: 10px;">Woodworking project plans</span></p>
					</div>
				</div>
			</div>
			<aside class="notes">
				<p>On the other hand, @theHotelBxl is doing an outstanding work on social media.</p>
				<p>They have managed to catch the interest of travel bloggers, including important publications and blogs. Their followers from Brussels are from the tourism industry, and fashion/lifestyle bloggers also connect them to an audience relevant to them.</p>
			</aside>
		</section>

		<!-- Composition of an audience 1 -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<h3>Typical audience composition</h3>
			<div class="row">
				<div class="small-6 columns">
					<img src="{{ site.url }}/blog/img/audience-composition.png" width="400px" style="vertical-align:top">
				</div>
				<div class="small-6 columns">
					<div style="max-width:400px; text-align:left;">
						<p class="fragment current-visible"><span style="padding-left:15px; background-color:rgba(31, 84, 180, .6)"> </span><span style="margin-left: 10px;">Digital marketers and communication professionals</span></p>
						<p class="fragment current-visible"><span style="padding-left:15px; background-color:rgba(255, 99, 14, .6)"> </span><span style="margin-left: 10px;">Your business ecosystem</span></p>
						<p class="fragment current-visible"><span style="padding-left:15px; background-color:rgba(71, 160, 44, .6)"> </span><span style="margin-left: 10px;">Your target market</span></p>
						<p class="fragment current-visible"><span style="padding-left:15px; background-color:rgba(255, 167, 14, .6)"> </span><span style="margin-left: 10px;">Industry specialists</span></p>
						<p class="fragment current-visible"><span style="padding-left:15px; background-color:rgba(214, 39, 40, .6)"> </span><span style="margin-left: 10px;">Niche</span></p>
						<p class="fragment current-visible"><span style="padding-left:15px; background-color:rgba(127, 127, 127, .6)"> </span><span style="margin-left: 10px;">Fake</span></p>
					</div>
				</div>
			</div>
			<aside class="notes">
				<p>6 types of communities might be following you.</p>
				<p>Size of each community varies from one audience to the other. Younger brands are often mostly followed by their friends and communication professionals from their area.</p>
				<p>Then only, little by little, they expand to reaching their market.</p>
			</aside>
		</section>
		
		<!-- Composition of an audience 2 -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<h3>Focus</h3>
			<div class="row">
				<div class="small-6 columns">
					<img src="{{ site.url }}/blog/img/audience-composition-focus.png" width="400px" style="vertical-align:top">
				</div>
				<div class="small-6 columns">
					<div style="max-width:400px; text-align:left;">
						<p><span style="padding-left:15px; background-color:rgba(31, 84, 180, .6)"> </span><span style="margin-left: 10px; color:#aaa;">Digital marketers and communication professionals</span></p>
						<p><span style="padding-left:15px; background-color:rgba(255, 99, 14, .6)"> </span><span style="margin-left: 10px; color:#aaa;">Your business ecosystem</span></p>
						<p><span style="padding-left:15px; background-color:rgba(71, 160, 44, 1)"> </span><span style="margin-left: 10px;">Your target market</span></p>
						<p><span style="padding-left:15px; background-color:rgba(255, 167, 14, 1)"> </span><span style="margin-left: 10px;">Industry specialists</span></p>
						<p><span style="padding-left:15px; background-color:rgba(214, 39, 40, 1)"> </span><span style="margin-left: 10px;">Niche</span></p>
						<p><span style="padding-left:15px; background-color:rgba(127, 127, 127, .6)"> </span><span style="margin-left: 10px; color:#aaa;">Fake</span></p>
					</div>
				</div>
			</div>
			<aside class="notes">
				<p>You should focus on your customers, and your industry. These are the one you'll convert to customers, or partners, suppliers, employees.</p>
				<p>In the next slides, we'll compare the audience reached by similar twitter accounts</p>
			</aside>
		</section>
		
		<!-- the Community manager: your best friend -->
		<section data-background="{{ site.url }}/blog/img/bg.jpg" data-background-size="100%">
			<div>
				<h3>Community manager is your best friend</h3>
				<ul>
					<li>be proactive</li>
					<li>be targeted</li>
					<li>have a funnel</li>
					<li>measure and optimize</li>
				</ul>
			</div>
		</section>
								
		<!-- next steps -->
		<section data-background="{{ site.url }}/blog/img/tribalytics-logo-square-large.png" data-background-size="600px">
			<div>
				<a href="http://tribalytics.com/?utm_source=mango-is&utm_medium=blog&utm_campaign=twitter-workshop-slides" target = "_blank">
					<img src="{{ site.url }}/blog/img/tribalytics-logo.png" style="border:none; box-shadow:none; background:none" width = "300px"/>
				</a>
				<p>
					<small>Mehdi El Fadil</small>
				</p>
				<br><br><br>
				<p>Special thanks to guest Dusan Jakovljevic from <a href="https://twitter.com/vattel" target="_blank">@Vattel</a> for his expert advices.</p>
				<p>Slide content partially crowdsourced with the audience during the presentation :)</p>
				<br><br>
				<p><a href="http://mango-is.com/blog">Back to the blog</a></p>
				
				<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png"></a><small>This article by <a xmlns:cc="http://creativecommons.org/ns#" href="http://mango-is.com" property="cc:attributionName" rel="cc:attributionURL">Mango Information Systems SPRL</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.<br>Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="http://mango-is.com/contact/" rel="cc:morePermissions">http://mango-is.com/contact/</a>.</small>
				<br><br>
			</div>
		</section>
		
	</div>

</div>
