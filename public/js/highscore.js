
$.getJSON('/highscore-data',function(JSON){
  console.log(JSON.pie_data);
  //let html_high = "<p>"+JSON.pie_data+"</p>"
  //$('#grid').append(html_high);
  let html_players = "<tr><td>Number</td><td>Name</td><td>Wins</td><td>Losses</td></tr>";
  let list = JSON.player_data;
  for (let i=0;i<5;i++){
    let temp = list[i];
    let temp_html = "<tr><td>"+i+"</td><td>"+temp.name+"</td><td>"+ temp.win+"</td><td>"+temp.loss+"</td></tr>";
    html_players += temp_html;
  }
  $('#highscore').append(html_players);
  draw_pie_chart(JSON.pie_data);
});

function draw_pie_chart(data_obj){
  console.log(data_obj);
  let data = [{"label":"win","value":data_obj.win},
              {"label":"loss","value":data_obj.loss}
             ];
  let w=200,h=200,r=100;
  let color = d3.scaleOrdinal(d3.schemeCategory10);
  
  var vis = d3.select("#grid")
  .append("svg:svg")
  .data([data])
    .attr("width",w)
    .attr("height",h)
  .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")")
  
  var arc = d3.arc()
  .outerRadius(r)
  
  var pie = d3.pie()
  .value(function(d){return d.value;});
  
  var arcs = vis.selectAll("g.slice")
  .data(pie).enter()
  .append("svg:g").attr("d",arc);
  
  arcs.append("svg:path")
  .attr("fill", function(d,i){return color(i); })
  .attr("d",arc);
  
  arcs.append("svg:text")
    .attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";      
  })
  .attr("text-anchor","middle")
  .text(function(d,i){ return data[i].label;});
}
