var colors = ['#1f54b4', '#ffa70e', '#47a02c']

var svg = d3.select("#chartsContainer").append("svg")
    .attr("width", width)
    .attr("height", height)

var matrix =[
		[27288, 3528, 3275]
		, [ 5153, 38020, 1163]
		, [2126, 668, 48346]
	]

var chord = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .matrix(matrix);

var width = 960,
    height = 500,
    innerRadius = Math.min(width, height) * .26,
    outerRadius = innerRadius * 1.1;


var svg = d3.select("#charts-container").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").selectAll("path")
    .data(chord.groups)
  .enter().append("path")
    .style("fill", function(d) { return colors[d.index]; })
    .style("stroke", function(d) { return colors[d.index]; })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

var ticks = svg.append("g").selectAll("g")
    .data(chord.groups)
  .enter().append("g").selectAll("g")
    .data(groupTicks)
  .enter().append("g")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius + ",0)";
    });

ticks.append("line")
    .attr("x1", 1)
    .attr("y1", 0)
    .attr("x2", 5)
    .attr("y2", 0)
    .style("stroke", "#000");

ticks.append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return d.label; });

svg.append("g")
    .attr("class", "chord")
  .selectAll("path")
    .data(chord.chords)
  .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) { return colors[d.target.index]; })
    .style("opacity", 1);

svg.append("svg:text")
	.attr("x", -410)
	.attr("y", -60)
	.text('Professionals and influencers');
svg.append("svg:text")
	.attr("x", -410)
	.attr("y", -40)
	.text('in the Dutch sports industry');

svg.append("svg:text")
	.attr("x", 180)
	.attr("y", -120)
	.text('Influencers in Belgian sports');

svg.append("svg:text")
	.attr("x", 180)
	.attr("y", 140)
	.text('Professionals in the Belgian');

svg.append("svg:text")
	.attr("x", 180)
	.attr("y", 160)
	.text('sports industry');

// Returns an array of tick angles and labels, given a group.
function groupTicks(d) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, 1000).map(function(v, i) {
    return {
      angle: v * k + d.startAngle,
      label: i % 5 ? null : v
    };
  });
}

// Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(g, i) {
    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
      .transition()
        .style("opacity", opacity);
  };
}
