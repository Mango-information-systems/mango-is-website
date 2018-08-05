/**
* Display app skull
*
* @params {selection} target
* 
*/
function render(target) {

	target.html(' \
		<div class="twelve columns"> \
			<div class="row"> \
				<div class="user six columns"></div> \
				<div class="legendWrapper six columns"> \
					<div class="row"> \
					</div> \
				</div> \
			</div> \
		</div> \
		<div id="chart" class="twelve columns"> \
			<svg width="120px" height="120px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ripple"> \
				<rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect> \
				<g> \
					<animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0"></animate> \
					<circle cx="50" cy="50" r="40" stroke="#565656" fill="none" stroke-width="6" stroke-linecap="round"> \
						<animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0;22;44"></animate> \
					</circle> \
				</g> \
				<g> \
					<animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="1;1;0"></animate> \
					<circle cx="50" cy="50" r="40" stroke="#FF6600" fill="none" stroke-width="6" stroke-linecap="round"> \
						<animate attributeName="r" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="0;22;44"></animate> \
					</circle> \
				</g> \
			</svg> \
			<br><small>Loading...</small> \
		</div> \
		<div class="six offset-by-three columns"> \
			<a id="exportLink" class=" button button-primary button-block" target="_blank" style="display:none;">Save as SVG image</a> \
		</div> \
	')

}

module.exports = {
	render: render
}



