var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 1.7));

    svg.append("text")
    .attr("x", width / 2)           
    .attr("y", height / 12)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Network of countries which are within the range");

    svg.attr("style", "outline: thin solid black;");

d3.json("data.json", function(error, graph) {
  if (error) throw error;
  
  graph.links.forEach(function(d){
    d.source = d.source_id;    
    d.target = d.target_id;
  });           
  // tool tip 
  var tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)

  //

 colors = ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]
    //
  var link = svg.append("g")
               
                .selectAll("line")
                .data(graph.links)
                .enter().append("line").style("stroke-width","3") .style("stroke", (d,i)=>{ if( graph.links[i].source_id == "Morocco"){
                  return colors[0];}
                else if (graph.links[i].source_id =="South africa" ){
                  return colors[1];
                }else if (graph.links[i].source_id =="Somalia" ){
                  return colors[2];
                }else if (graph.links[i].source_id =="Egypt" ){
                  return colors[4];
                }else{ return "#aaa";}})
;
  
  var node = svg.append("g")
            .attr("class", "nodes")
  .selectAll("cirle")
            .data(graph.nodes) 
  .enter().append("svg:image")
  .attr("xlink:href",(d,i) =>     "./data/"+ graph.nodes[i].id + ".PNG").attr("stroke", "black");
          console.log(graph.links)


  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
          //  .attr("r", 10)
          // .style("fill", "url(#icon.png)")
          //  .style("stroke", "#969696")
          //  .style("stroke-width", "1px")
         .attr("x", function (d) { return d.x- 25; })
         .attr("y", function(d) { return d.y-25; })
        //  .append("svg:image")
        //  .attr("xlink:href", "icon.png")
        //  .attr("cx", function(d) { return d.x; })
        //  .attr("y", function (d) { return d.y; })
        //  .attr("height", 10)
        //  .attr("width", 10);
    
    
    // label
    // 		.attr("x", function(d) { return d.x; })
    //         .attr("y", function (d) { return d.y; })
    //         .style("font-size", "20px").style("fill", "#4393c3");
  }

  // Add events to circles
node.on("mouseover", function(d,i) {
  tip.style("opacity", 1)
     .html( graph.nodes[i].id)
     .style("left", (d3.event.pageX-25) + "px")
     .style("top", (d3.event.pageY-75) + "px")
  })
  .on("mouseout", function(d) {
    tip.style("opacity", 0)
  })
 
});

/*function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  simulation.fix(d);
}

function dragged(d) {
  simulation.fix(d, d3.event.x, d3.event.y);
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  simulation.unfix(d);
}*/
