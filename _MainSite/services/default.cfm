<cfprocessingdirective pageencoding="utf-8" />
<cfsavecontent variable="description">We develop custom social media analytics tools (real time trends monitoring, maps , profiling), and offer consulting in Data-warehousing (ETL, reporting).</cfsavecontent>
<cfsavecontent variable="title">Social media analytics, Business intelligence consulting</cfsavecontent>
<cfsavecontent variable="content">
	<div class="row">
		<h1 id="services">Services</h1>
		<h2 id="social-media-monitoring">Social media & big data <small>Tailor-made analytics</small></h2>
		<ul class="thumbnails">
			<li class="span4">
				<div class="thumbnail">
					<img src="../img/real-time-trends-monitoring.jpg" alt="real time trends monitoring"/>
					<h3 id="real-time-analytics">real-time analytics & visualizations</h3>
					<p>We consume social media data in real time to get actionable insights from it and produce modern data visualizations.</p>
				</div>
			</li>
			<li class="span4">
				<div class="thumbnail">
					<img src="../img/geotags-maps-real-time.png" alt="Interactive map with using openstreetMap"/>
					<h3 id="geolocation">geolocation</h3>
					<p>Target users from specific areas using geo-located services, use interactive maps to better represent information.</p>
				</div>
			</li>
			<li class="span4">
				<div class="thumbnail">
					<img src="../img/social-media-analytics-logo.png" alt="social media data integration"/>
					<h3 id="data-extraction">data extraction</h3>
					<p>Need data from anywhere online ? Ask us. Events, Businesses, People, sectorial statistics, Cultural/entertainment metadata...</p>
				</div>
			</li>
		</ul>
		<div class="well">
			Do you have a <strong>requirement involving data</strong> for which you are not sure about the feasibility? Get in touch, we love to chat. <a data-toggle="modal" href="#contact" class="btn btn-primary">Contact us »</a>
		</div>
		<h2 id="business-intelligence">Business Intelligence <small>State of the art data-warehousing</small></h2>
		<ul class="thumbnails">
			<li class="span4">
				<div class="thumbnail">
					<img src="../img/bime-business-dimensions.jpg" alt="business dimensions"/>
					<h3 id="business-analysis">Data modeling and business analysis</h3>
					<p>We design data-warehouses that work. It takes an inquisitive mind during requirements gathering, to get able to model datamarts fitting to the reporting needs, therefore easy to query.</p>
				</div>
			</li>
			<li class="span4">
				<div class="thumbnail">
					<img src="../img/SAP-BusinessObjects-logo.png" alt="SAP Business Objects Data Services"/>
					<h3 id="data-integration">Data Integration (ETL)</h3>
					<p>
						Data integration is the most complex part of implementation of data-warehouses. We master advanced techniques and love to be challenged with edge cases. We design the whole process to be fault-tolerant and always leave you with a usable dataset.
					</p>
				</div>
			</li>
			<li class="span4">
				<div class="thumbnail">
					<img src="../img/interactive-reporting-olap.jpg" alt="reporting"/>
					<h3 id="reporting">Reporting</h3>
					<p>We deliver business-oriented reporting solutions, and are always available to coach and support the hands-on users.</p>
				</div>
			</li>
		</ul>
		<div class="well">
			Do you need <strong>high skills BI consultants</strong>? Ask us! <a data-toggle="modal" href="#contact" class="btn btn-primary">Contact us »</a>
		</div>
	</div>
	<div class="modal hide fade" id="labs-redirect">
		<div class="modal-header">
			<a data-dismiss="modal" class="close">×</a>
			<h2>Redirected from our labs</h2>
		</div>
		<div class="modal-body">
			<p>The real time tweets map has been shut down. We stopped this service in order to focus on our new products: <a href="http://tribalytics.com" target = "_blank">tribalytics</a> and <a href="http://news-pipe.com" target = "_blank">news-pipe</a>.</p>
			<p>The tweets map experiment extracted <strong>1200 tweets geo-tagged around Brussels every day in average</strong>, and displayed in a map in real time.</p>
			<p>we are always available to develop custom solutions, this page presents our offering.</p>
			<p>Thanks for your interest.</p>
			<p>Mehdi El Fadil, Mango Information Systems</p>
			<p>January 22nd, 2013</p>
		</div>
		<div class="modal-footer">
			<a data-dismiss="modal" class="btn btn-primary" href="#">Close</a>
		</div>
	</div>
</cfsavecontent>
<cfsavecontent variable="readyActions">
	if (window.location.hash == '#labs-redirect')	{
		$('#labs-redirect').modal({show:true})
	}
</cfsavecontent>
<cfinclude template="../default.cfm" />
