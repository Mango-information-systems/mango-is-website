---
layout: post
language: en
title: Belgians, twitter and Klout
subtitle: One year of twitto.be
description: Figures about the Belgian users of twitter, based on twitto.be data
author: Mango Information Systems
tags: mehdi
# optional
thumbnail: blog/img/thumbnails/2014-09-25-Belgians-twitter-and-klout.png
css: blog/css/2014-09-25-Belgians-twitter-and-klout.css
scripts: [js/d3.v3.min.js, blog/js/2014-09-25-Belgians-twitter-and-klout.js]
---
<div class="section" markdown="1">

As [twitto.be](twitto.be), the directory of Belgian twitter users was launched one year ago, I thought it would be a good time to analyze how it has evolved. Here are some stats that I thought are worth sharing.

<!--[if lt IE 9]>
<small><i class="icon-warning-sign">  </i> Recommendation: use a more recent web browser for an enhanced experience on this post.</small>
<![endif]-->

<!--[if gte IE 9]><!-->
<small>Hint: mouse over or tap next to the <i class="icon-search">  </i> icons to interact</small>
<!-- <![endif]-->


</div>

<div class="section" markdown="1">

##Key figures

<div class="row-fluid">

	<div class="span4 metric tlt" title="Number of Belgian twitter users referenced in twitto.be. 23% of them have been added during the past year. This is only a subset of the Belgian twitter users.">
		<div class="metric-title"><img src="/blog/img/twitter-logo-gray-30x24.png"/> twittos<span class="pull-right"><i class="icon-search">  </i></span></div>
		<div><span class="metric-val">113658</span> <span class="metric-detail green">+23%</span></div>
	</div>

	<div class="span4 metric tlt" title="This is the number of times twitto.be was visited last year, mostly without any promotion from our part. About 1000 persons visit twitto.be regularly.">
		<div class="metric-title"><img src="/blog/img/user-gray-21x24.png"/> visitors<span class="pull-right"><i class="icon-search">  </i></span></div>
		<div><span class="metric-val">7729</span> <span class="metric-detail"><small> 27% returning</small></span></div>
	</div>

	<div class="span4 metric tlt" title="Klout remains controversial, and some people ask to be removed from it.">
		<div class="metric-title"><img src="/blog/img/quit-gray-24x24.png"/> left Klout<span class="pull-right"><i class="icon-search">  </i></span></div>
		<div><span class="metric-val">178</span> <span class="metric-detail"><small>including 38 influencers</small></span></div>
	</div>
	
</div>
</div>

<div class="section" markdown="1">

##Number of twittos per Klout score

As I've [already written in the past](http://mango-is.com/blog/business/finding-twitter-influencers-the-recurring-problem-of-defining-influence.html), Klout scores or similar ranking systems should be considered with care. I personally don't see them as important at all. However, it's compelling to see the number of people that are in a given range of Klout score.

<div class="row-fluid">

	<div id="barchart" class="span8">
	<!--[if lt IE 9]>
		<img src="{{ site.url }}/blog/img/fallback/twittos-per-klout-score.png">
	<![endif]-->
	
	<!--[if gte IE 9]><!-->
		<svg width="960" height="500" preserveAspectRatio="xMinYMin" viewbox="0 0 960 500"><g transform="translate(40,20)"><g class="x axis" transform="translate(0,420)"><g class="tick" style="opacity: 1;" transform="translate(41.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">no Klout</text></g><g class="tick" style="opacity: 1;" transform="translate(109.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">10-14</text></g><g class="tick" style="opacity: 1;" transform="translate(177.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">15-19</text></g><g class="tick" style="opacity: 1;" transform="translate(245.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">20-24</text></g><g class="tick" style="opacity: 1;" transform="translate(313.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">25-29</text></g><g class="tick" style="opacity: 1;" transform="translate(381.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">30-34</text></g><g class="tick" style="opacity: 1;" transform="translate(449.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">35-39</text></g><g class="tick" style="opacity: 1;" transform="translate(517.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">40-44</text></g><g class="tick" style="opacity: 1;" transform="translate(585.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">45-49</text></g><g class="tick" style="opacity: 1;" transform="translate(653.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">50-54</text></g><g class="tick" style="opacity: 1;" transform="translate(721.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">55-59</text></g><g class="tick" style="opacity: 1;" transform="translate(789.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">60-64</text></g><g class="tick" style="opacity: 1;" transform="translate(857.5,0)"><line y2="6" x2="0"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">65+</text></g><path class="domain" d="M0,6V0H900V6"></path></g><g class="y axis"><g class="tick" style="opacity: 1;" transform="translate(0,420)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">0.0</text></g><g class="tick" style="opacity: 1;" transform="translate(0,367.9050383270075)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">5.0k</text></g><g class="tick" style="opacity: 1;" transform="translate(0,315.810076654015)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">10k</text></g><g class="tick" style="opacity: 1;" transform="translate(0,263.71511498102257)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">15k</text></g><g class="tick" style="opacity: 1;" transform="translate(0,211.62015330803007)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">20k</text></g><g class="tick" style="opacity: 1;" transform="translate(0,159.52519163503757)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">25k</text></g><g class="tick" style="opacity: 1;" transform="translate(0,107.43022996204508)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">30k</text></g><g class="tick" style="opacity: 1;" transform="translate(0,55.335268289052635)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">35k</text></g><g class="tick" style="opacity: 1;" transform="translate(0,3.2403066160601384)"><line x2="-6" y2="0"></line><text x="-9" y="0" dy=".32em" style="text-anchor: end;">40k</text></g><path class="domain" d="M-6,0H0V420H-6"></path><text transform="rotate(-90)" y="6" dy=".71em" style="text-anchor: end;">#&nbsp;twittos</text></g><g class="g" transform="translate(11,0)"><rect width="30" y="280.38550271638013" x="1" height="139.61449728361987" title="13400 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(79,0)"><rect width="30" y="0" x="1" height="420" title="40311 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(147,0)"><rect width="30" y="186.1352980576021" x="1" height="233.8647019423979" title="22446 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(215,0)"><rect width="30" y="300.25452109845946" x="1" height="119.74547890154054" title="11493 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(283,0)"><rect width="30" y="353.9956835603185" x="1" height="66.00431643968147" title="6335 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(351,0)"><rect width="30" y="379.7618516037806" x="1" height="40.2381483962194" title="3862 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(419,0)"><rect width="30" y="389.13894470491925" x="1" height="30.861055295080746" title="2962 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(487,0)"><rect width="30" y="362.2371064969859" x="1" height="57.762893503014084" title="5544 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(555,0)"><rect width="30" y="383.9086105529508" x="1" height="36.09138944704921" title="3464 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(623,0)"><rect width="30" y="400.328942472278" x="1" height="19.671057527721985" title="1888 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(691,0)"><rect width="30" y="409.08089603334076" x="1" height="10.919103966659236" title="1048 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(759,0)"><rect width="30" y="412.80047629679245" x="1" height="7.1995237032075465" title="691 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(827,0)"><rect width="30" y="417.7703356403959" x="1" height="2.229664359604101" title="214 twittos" style="fill: #26963C;"></rect></g><g class="g" transform="translate(11,0)"><rect width="30" y="302.0882637493488" x="31" height="117.91173625065119" title="11317 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(79,0)"><rect width="30" y="66.06683039368909" x="31" height="353.9331696063109" title="33970 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(147,0)"><rect width="30" y="252.44176527498698" x="31" height="167.55823472501302" title="16082 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(215,0)"><rect width="30" y="330.3028949914416" x="31" height="89.69710500855842" title="8609 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(283,0)"><rect width="30" y="368.5093398824142" x="31" height="51.490660117585776" title="4942 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(351,0)"><rect width="30" y="386.6488055369502" x="31" height="33.35119446304981" title="3201 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(419,0)"><rect width="30" y="394.5464017265759" x="31" height="25.45359827342412" title="2443 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(487,0)"><rect width="30" y="370.24931160229215" x="31" height="49.75068839770785" title="4775 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(555,0)"><rect width="30" y="388.02411252511723" x="31" height="31.975887474882768" title="3069 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(623,0)"><rect width="30" y="398.90154052243804" x="31" height="21.09845947756196" title="2025 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(691,0)"><rect width="30" y="408.3932425392573" x="31" height="11.606757460742699" title="1114 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(759,0)"><rect width="30" y="412.80047629679245" x="31" height="7.1995237032075465" title="691 twittos" style="fill: #8DD35F;"></rect></g><g class="g" transform="translate(827,0)"><rect width="30" y="417.8641065714073" x="31" height="2.1358934285926807" title="205 twittos" style="fill: #8DD35F;"></rect></g><g class="legend" transform="translate(0, 0)"><rect x="18" y="462" width="18" height="18" style="fill: #26963C;"></rect><text x="80" y="470" dy=".35em" style="text-anchor: end;">2014</text></g><g class="legend" transform="translate(100, 0)"><rect x="18" y="462" width="18" height="18" style="fill: #8DD35F;"></rect><text x="80" y="470" dy=".35em" style="text-anchor: end;">2013</text></g></g></svg>
	
	<!-- <![endif]-->
	</div>

	<div class="span4">
		<p id="barchart1" class="interactive"><i class="icon-search"> </i> <strong>12%</strong> of Belgian twittos are <strong>not on Klout</strong>. <small>We do not show them on twitto.be</small>.</p>
		<p id="barchart2" class="interactive"><i class="icon-search"> </i> <strong>65%</strong> of the twittos <strong>use twitter casually</strong>. They do not engage much with other twittos, or they use twitter mostly for reading; some of them are inactive.</p>
		<p id="barchart3" class="interactive"><i class="icon-search"> </i> While we have more twittos for most of the Klout scores, there are a bit <strong>less twittos with a high Klout</strong> score in 2014 than in 2013. More about this in the next section of this post.</p>
	</div>
</div>

</div>


<div class="section" markdown="1">

##How did the Klout scores evolve between 2013 and 2014?

The flow chat below shows how the Klout scores have been evolving between 2013 and 2014 (twittos have been grouped in 4 ranges based on their score).

<div class="row-fluid">
<div class="span6">
<!--[if lt IE 9]>
	<img src="{{ site.url }}/blog/img/fallback/klout-scores-evolution.png">
<![endif]-->

<!--[if gte IE 9]><!-->

	<div id="sankey"><svg width="500" height="500" preserveAspectRatio="xMinYMin" viewbox="0 0 500 500"><g transform="translate(40,20)"><g><path class="link sankey1" d="M15,305.82376998388895C220,305.82376998388895 220,305.82376998388895 425,305.82376998388895" style="stroke-width: 288.3524600322221;"><title>55398 twittos in range 10-24 in 2013 stayed in that range in 2014</title></path><path class="link sankey1" d="M15,81.24327673813359C220,81.24327673813359 220,81.29012269178337 425,81.29012269178337" style="stroke-width: 73.35035320361878;"><title>14092 twittos in range 25-49 in 2013 stayed in that range in 2014</title></path><path class="link" d="M15,126.90246622877679C220,126.90246622877679 220,152.6635270789441 425,152.6635270789441" style="stroke-width: 17.968025777667616;"><title>3452 twittos in range 25-49 in 2013 moved to range 10-24 in 2014</title></path><path class="link" d="M15,153.87111166191596C220,153.87111166191596 220,125.74172759945469 425,125.74172759945469" style="stroke-width: 15.55285661172388;"><title>2988 twittos in range 10-24 in 2013 moved to range 25-49 in 2014</title></path><path class="link sankey1" d="M15,16.881150080555212C220,16.881150080555212 220,16.881150080555212 425,16.881150080555212" style="stroke-width: 13.50204486305614;"><title>2594 twittos in range 50-74 in 2013 stayed in that range in 2014</title></path><path class="link sankey2" d="M15,27.088362870244143C220,27.088362870244143 220,41.15875573181311 425,41.15875573181311" style="stroke-width: 6.912380716321725;"><title>1328 twittos in range 50-74 in 2013 moved to range 25-49 in 2014</title></path><path class="link" d="M15,42.63700582476143C220,42.63700582476143 220,25.56326682364605 425,25.56326682364605" style="stroke-width: 3.862188623125542;"><title>742 twittos in range 25-49 in 2013 moved to range 50-74 in 2014</title></path><path class="link sankey3" d="M15,145.99058123683233C220,145.99058123683233 220,27.598463254430538 425,27.598463254430538" style="stroke-width: 1;"><title>40 twittos in range 10-24 in 2013 moved to range 50-74 in 2014</title></path><path class="link sankey2" d="M15,30.625232370801836C220,30.625232370801836 220,143.59883504771346 425,143.59883504771346" style="stroke-width: 1;"><title>31 twittos in range 50-74 in 2013 moved to range 10-24 in 2014</title></path><path class="link sankey1" d="M15,0.05465361259140107C220,0.05465361259140107 220,0.05465361259140007 425,0.05465361259140007" style="stroke-width: 1;"><title>21 twittos in range 75-100 in 2013 stayed in that range in 2014</title></path><path class="link" d="M15,10.122319990085513C220,10.122319990085513 220,0.1171148841244277 425,0.1171148841244277" style="stroke-width: 1;"><title>3 twittos in range 50-74 in 2013 moved to range 75-100 in 2014</title></path><path class="link" d="M15,0.11190977816334308C220,0.11190977816334308 220,10.127525096046599 425,10.127525096046599" style="stroke-width: 1;"><title>1 twittos in range 75-100 in 2013 moved to range 50-74 in 2014</title></path></g><g><g class="node" transform="translate(0,1.887379141862766e-15)"><rect height="0.114512331143884" width="15" style="fill: #1F722F; stroke: #0f3717;"><title>22 twittos
with score in range 75-100</title></rect><text x="21" y="0.057256165571942" dy=".35em" text-anchor="start">75-100</text></g><g class="node" transform="translate(0,10.114512331143885)"><rect height="20.591399182054776" width="15" style="fill: #26963C; stroke: #12491d;"><title>3956 twittos
with score in range 50-74</title></rect><text x="21" y="10.295699591027388" dy=".35em" text-anchor="start">50-74</text></g><g class="node" transform="translate(0,40.70591151319866)"><rect height="95.18056760441195" width="15" style="fill: #8DD35F; stroke: #45672e;"><title>18286 twittos
with score in range 25-49</title></rect><text x="21" y="47.590283802205974" dy=".35em" text-anchor="start">25-49</text></g><g class="node" transform="translate(0,145.8864791176106)"><rect height="304.11352088238937" width="15" style="fill: #CCFFAB; stroke: #637c53;"><title>58426 twittos
with score in range 10-24</title></rect><text x="21" y="152.05676044119468" dy=".35em" text-anchor="start">10-24</text></g><g class="node" transform="translate(425,8.881784197001252e-16)"><rect height="0.12492254306605527" width="15" style="fill: #1F722F; stroke: #0f3717;"><title>24 twittos
with score in range 75-100</title></rect><text x="-6" y="0.062461271533027635" dy=".35em" text-anchor="end">75-100</text></g><g class="node" transform="translate(425,10.124922543066056)"><rect height="17.577642830586193" width="15" style="fill: #26963C; stroke: #12491d;"><title>3377 twittos
with score in range 50-74</title></rect><text x="-6" y="8.788821415293096" dy=".35em" text-anchor="end">50-74</text></g><g class="node" transform="translate(425,37.70256537365225)"><rect height="95.8155905316644" width="15" style="fill: #8DD35F; stroke: #45672e;"><title>18408 twittos
with score in range 25-49</title></rect><text x="-6" y="47.9077952658322" dy=".35em" text-anchor="end">25-49</text></g><g class="node" transform="translate(425,143.51815590531663)"><rect height="306.48184409468337" width="15" style="fill: #CCFFAB; stroke: #637c53;"><title>58881 twittos
with score in range 10-24</title></rect><text x="-6" y="153.24092204734168" dy=".35em" text-anchor="end">10-24</text></g></g><g><text transform="translate(-20,470)">2013</text><text transform="translate(420,470)">2014</text></g></g></svg></div>

<!-- <![endif]-->

</div>
<div class="span6">

<p id="sankey1" class="interactive"><i class="icon-search"> </i> Most of the twittos haven't had an important change of their Klout scores.</p>
<p id="sankey2" class="interactive"><i class="icon-search"></i> <strong>More than a third of the influencers</strong> (Klout 50+) had a <strong>decrease of their score</strong> to less than 49 in 2014. Precisely, 1359 twittos are in this situation. This can probably be explained by changes in Klout's algorithm, and the incorporation of more data sources (Instagram, Bing, Wikipedia...) as factor for the score calculation.</p>
<p id="sankey3" class="interactive"><i class="icon-search"></i> <strong>40</strong> twittos went <strong>from a low score in 2013 to a 50+ Klout score in 2014</strong>.</p>

</div>

</div>
</div>

<div class="section" markdown="1">

##Visitors interests
    
<div class="row-fluid">
<div class="span6">

<!--[if lt IE 9]>
	<img src="{{ site.url }}/blog/img/fallback/visitors-interests.png">
<![endif]-->

<!--[if gte IE 9]><!-->

	<div id="bars2"><svg width="500" height="250" preserveAspectRatio="xMinYMin" viewbox="0 0 500 250"><g transform="translate(40,20)"><g transform="translate(0,0)"><rect x="100" width="340" height="19" fill="#1f77b4" title="1168"></rect><text x="10" y="10" dy=".35em">journalism</text></g><g transform="translate(0,20)"><rect x="100" width="161.5582191780822" height="19" fill="#ff7f0e" title="555"></rect><text x="10" y="10" dy=".35em">ux</text></g><g transform="translate(0,40)"><rect x="100" width="96.93493150684931" height="19" fill="#2ca02c" title="333"></rect><text x="10" y="10" dy=".35em">innovation</text></g><g transform="translate(0,60)"><rect x="100" width="78.01369863013697" height="19" fill="#d62728" title="268"></rect><text x="10" y="10" dy=".35em">technology</text></g><g transform="translate(0,80)"><rect x="100" width="56.47260273972603" height="19" fill="#9467bd" title="194"></rect><text x="10" y="10" dy=".35em">professor</text></g><g transform="translate(0,100)"><rect x="100" width="30.565068493150683" height="19" fill="#8c564b" title="105"></rect><text x="10" y="10" dy=".35em">seo</text></g><g transform="translate(0,120)"><rect x="100" width="27.65410958904109" height="19" fill="#e377c2" title="95"></rect><text x="10" y="10" dy=".35em">marketing</text></g><g transform="translate(0,140)"><rect x="100" width="20.376712328767123" height="19" fill="#7f7f7f" title="70"></rect><text x="10" y="10" dy=".35em">scénariste</text></g></g></svg></div>
    
<!-- <![endif]-->

</div>

<div class="span6" markdown="1">

These are the most popular search terms on twitto.be.

<p id="bars21" class="interactive" markdown="1"><i class="icon-search"> </i> "Journalism" is by far the most popular search. [1611 journalists are referenced](http://twitto.be/?search=journalist%20journalisme%20journaliste){: target="_blank" } on twitto.be</p>

There is a long tail of search terms, in total **534 combinations of keywords, topics, locations and languages** have been visited.

</div>

</div> <!-- end row -->

</div>

<div class="section" markdown="1">

##Where the visitors came from


<div class="row-fluid">
<div class="span6">

<!--[if lt IE 9]>
	<img src="{{ site.url }}/blog/img/fallback/visitors-origins.png">
<![endif]-->

<!--[if gte IE 9]><!-->

	<div id="donut"><svg width="500" height="500" preserveAspectRatio="xMinYMin" viewbox="0 0 500 500"><g transform="translate(250,250)"><g class="arc donut1" title="3849 visits"><path d="M1.2858366715134961e-14,-210A210,210 0 1,1 -118.42967310692228,173.41975818166605L-76.13336128302146,111.48413025964247A135,135 0 1,0 8.266092888301046e-15,-135Z" style="fill: #3B5998;"></path><text transform="translate(164.81688381058365,50.90819984018853)" dy=".35em" style="fill:white; text-anchor: middle;">facebook</text></g><g class="arc" title="1377 visits"><path d="M-118.42967310692228,173.41975818166605A210,210 0 0,1 -196.0427455158345,-75.28108614129948L-126.02747926017932,-48.39498394797824A135,135 0 0,0 -76.13336128302146,111.48413025964247Z" style="fill: #4099FF;"></path><text transform="translate(-164.66775393753005,51.388528030768235)" dy=".35em" style="text-anchor: middle;">twitter</text></g><g class="arc" title="831 visits"><path d="M-196.0427455158345,-75.28108614129948A210,210 0 0,1 -81.10537942122127,-193.705749602173L-52.139172485070816,-124.52512474425406A135,135 0 0,0 -126.02747926017932,-48.39498394797824Z" style="fill: red;"></path><text transform="translate(-123.78487329960697,-120.13973173850627)" dy=".35em" style="fill:white; text-anchor: middle;">v1n.ch</text></g><g class="arc" title="289 visits"><path d="M-81.10537942122127,-193.705749602173A210,210 0 0,1 -24.23310129114112,-208.5971159959152L-15.57842225859072,-134.09814599737405A135,135 0 0,0 -52.139172485070816,-124.52512474425406Z" style="fill: #cccccc;"></path><text transform="translate(-43.69418690968585,-166.87440795490912)" dy=".35em" style="text-anchor: middle;">Other</text></g><g class="arc" title="119 visits"><path d="M-24.23310129114112,-208.5971159959152A210,210 0 0,1 -3.8575100145404884e-14,-210L-2.479827866490314e-14,-135A135,135 0 0,0 -15.57842225859072,-134.09814599737405Z" style="fill: #BBBBAA;"></path><text transform="translate(-9.969544951470988,-182.21166677510732)" dy=".35em" style="text-anchor: middle;">bvlg</text></g></g></svg></div>
    
<!-- <![endif]-->

</div>

<div class="span6" markdown="1">

The referral traffic figures shown by Google analytics are very interesting. Referrals (visits coming through links from third-party websites) compose 61% of twitto.be's traffic.

<p id="donut1" class="interactive"><i class="icon-search"> </i> Although twitto.be is about twitter users, <strong>60% of the referral visitors came from facebook</strong>.</p>

<p id="donut2" class="interactive"><i class="icon-search"> </i> Bruno Peeters monitors and blogs the evolution of the Belgian social media landscape, you should check it at <a href="https://bvlg.blogspot.com" target = "_blank">bvlg.blogspot.com</a>.</p>

<p id="donut3" class="interactive"><i class="icon-search"> </i> 12% of the visits came from the former ranking of Belgians on Klout done by Vincent Battaglia at <a href="http://v1n.ch/klout.be/" target = "_blank">Klout.be on v1n.ch</a>.</p>


</div>

</div> <!-- end row -->

</div> <!-- end section -->

<div class="section" markdown="1">

##Next steps

What's next for twitto.be ? The tool could benefit from some improvements:

* **performance**: page load time could be greatly improved, a redesign is necessary. **SEO** could also benefit from this.
* **design**: interface can be improved, a different layout would probably be more suitable for mobile devices.
* **marketing**: higher visibility could be provided to the project with simple actions, like tweeting about specific rankings, or publishing the top Belgian tweets on a daily basis.
    
I am now focusing on **[Tribalytics](http://tribalytics.com?utm_source=mango-is&utm_medium=blog&utm_campaign=twitto-article)** - which can be considered as a **twitto.be for professionals** -, and do not plan to spend much time on twitto.be in the following months. However, twitto.be is **open source** and contributions are welcome. Head to our [github repository](https://github.com/Mango-information-systems/twitto_be/issues) to start discussing about this.
    
</div> <!-- end section -->
