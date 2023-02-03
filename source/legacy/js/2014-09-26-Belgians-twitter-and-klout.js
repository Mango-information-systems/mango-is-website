// dashboard interactions
d3.select('#barchart1').on('mouseover', function() {d3.selectAll('.g').filter(function(d, i) {return i!=0 && i!=13}).transition().style('opacity', .2)})
d3.select('#barchart1').on('mouseout', function() {d3.selectAll('.g').transition().style('opacity', 1)})
d3.select('#barchart2').on('mouseover', function() {d3.selectAll('.g').filter(function(d, i) {return [1, 2, 3, 14, 15, 16].indexOf(i) == -1}).transition().style('opacity', .2)})
d3.select('#barchart2').on('mouseout', function() {d3.selectAll('.g').transition().style('opacity', 1)})
d3.select('#barchart3').on('mouseover', function() {d3.selectAll('.g').filter(function(d, i) {return [9, 10, 11, 22, 23, 24].indexOf(i) == -1}).transition().style('opacity', .2)})
d3.select('#barchart3').on('mouseout', function() {d3.selectAll('.g').transition().style('opacity', 1)})

d3.select('#sankey1').on('mouseover', function() {d3.selectAll('.sankey1').transition().style('stroke-opacity', .75).style('stroke', '#26963C')})
d3.select('#sankey1').on('mouseout', function() {d3.selectAll('.sankey1').transition().style('stroke-opacity', .2).style('stroke', 'black')})
d3.select('#sankey2').on('mouseover', function() {d3.selectAll('.sankey2').transition().style('stroke-opacity', .75).style('stroke', '#26963C')})
d3.select('#sankey2').on('mouseout', function() {d3.selectAll('.sankey2').transition().style('stroke-opacity', .2)	.style('stroke', 'black')})
d3.select('#sankey3').on('mouseover', function() {d3.selectAll('.sankey3').transition().style('stroke-opacity', .75).style('stroke', '#26963C').style('stroke-width', 3)})
d3.select('#sankey3').on('mouseout', function() {d3.selectAll('.sankey3').transition().style('stroke-opacity', .2).style('stroke', 'black').style('stroke-width', 1)})

d3.select('#bars21').on('mouseover', function() {d3.selectAll('#bars2 rect').filter(function(d, i) {return i!=0}).transition().style('opacity', .2)})
d3.select('#bars21').on('mouseout', function() {d3.selectAll('#bars2 rect').transition().style('opacity', 1)})

d3.select('#donut1').on('mouseover', function() {d3.selectAll('.arc').filter(function(d, i) {return i!=0}).transition().style('opacity', .2)})
d3.select('#donut1').on('mouseout', function() {d3.selectAll('.arc').transition().style('opacity', 1)})
d3.select('#donut2').on('mouseover', function() {d3.selectAll('.arc').filter(function(d, i) {return i!=4}).transition().style('opacity', .2)})
d3.select('#donut2').on('mouseout', function() {d3.selectAll('.arc').transition().style('opacity', 1)})
d3.select('#donut3').on('mouseover', function() {d3.selectAll('.arc').filter(function(d, i) {return i!=2}).transition().style('opacity', .2)})
d3.select('#donut3').on('mouseout', function() {d3.selectAll('.arc').transition().style('opacity', 1)})
