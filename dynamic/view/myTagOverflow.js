/**
* Display app skull
*
* @params {selection} target
* 
*/
function render(target) {

	target.html(' \
		<div class="xs-twelve lg-two columns"> \
			<div class="row"> \
				<div id="user" class="twelve columns"></div> \
				<div id="legend" class="twelve columns"> \
					<div class="row"> \
					</div> \
				</div> \
			</div> \
		</div> \
		<div id="chart" class="xs-twelve lg-ten columns"> \
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
	')

}

module.exports = {
	render: render
}



