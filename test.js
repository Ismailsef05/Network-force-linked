// set the dimensions and margins of the graph
var margin = {top: 40, right: 20, bottom: 30, left: 60},
    width = 500 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg2 object to the body of the page
// append a 'group' element to 'svg2'
// moves the 'group' element to the top left margin
var svg2 = d3.select("#histo").append("svg2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("power.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
    d.percent = +d.percent;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.percent; }) + 3]);
  svg2.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
              .tickSize(-width)
              .tickFormat("")
             ) .style("stroke", "green")
  // append the rectangles for the bar chart
  svg2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.percent); })
      .attr("height", function(d) { return height - y(d.percent); })
      .style('fill',"#cad2c5" )
      .style("stroke", "black");

  // add the x Axis
  svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg2.append("g")
      .call(d3.axisLeft(y));

    
    

      svg2.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -30 )
    .attr("x", - margin.left *2)
    .attr("transform", "rotate(-90)")
    .text("Percent").selectAll('.tick text')
    .style('font-size', 12);
     // Graph Title
     svg2.append("text")
     .attr("x", (width / 2))             
     .attr("y", 0 - (margin.top / 2))
     .attr("text-anchor", "middle")  
     .style("font-size", "16px") 
     .style("text-decoration", "underline")  
     .text("Water usage for powerplants cooling");
})