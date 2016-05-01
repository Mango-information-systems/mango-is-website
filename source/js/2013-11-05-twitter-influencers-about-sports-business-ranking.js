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


var paths = d3.select("#chart").selectAll("path")
	, chords = d3.select("#chart").selectAll(".chord path")
    
paths.data(chord.groups)
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

chords.data(chord.chords)

// Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(g, i) {

    chords.filter(function(d) { 
			return d.source.index != i && d.target.index != i; })
      .transition()
        .style("opacity", opacity);
  };
}
