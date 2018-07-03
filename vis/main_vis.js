// # Initialize variables
// # ------------------------------

// # Basic
var point_number  = 10
var update_second = 1000
var update_second_new = 1000

var dist_min      = 300
var min_text      = 285
var count_gap     = 0
var dist_max_store =[]
// # Start Position
pos_x_start       = 400
pos_y_start       = 200
pos_random_factor_x = 200
pos_random_factor_y = 300
mouseover_event=false
// # Labels
count=0
count_id=0
label = ["Visualizations", "Hacks & Side Projects"]
label_url = ["visualize.html", "build.html"]

// # Data Structures
point_pos_new         = []
point_pos_old         = []
line_pos_new          = []
line_pos_old          = []
line_pos_new_dist     = []

// # Initialize Data Structures
for (var j = 0; j < point_number; j++) {

  // # Append coordinates
  point_pos_old.push({
    pos_x: pos_x_start + Math.random()*pos_random_factor_x*(Math.round(Math.random()) * 2 - 1),
    pos_y: pos_y_start + Math.random()*pos_random_factor_y*(Math.round(Math.random()) * 2 - 1),
  });

  // # Append coordinates
  point_pos_new.push({
    pos_x: pos_x_start, 
    pos_y: pos_y_start 
  });

} 


  function intersects(polygon_new,polygon_old) {
    if (d3.select("#circle0").empty()) {
      value_1= "clear0"
    }  else {
    circle = d3.select("#circle0").datum()
    var intersect_value_new=(pointInPolygon(circle, polygon_new)
        || polygonEdges(polygon_new).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; }));
    
    var intersect_value_old=(pointInPolygon(circle, polygon_old)
        || polygonEdges(polygon_old).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; }));

    if (intersect_value_new==true |intersect_value_old==true ) {
      value_1="overlap0"
    } else {
      value_1="clear0"
    }
  }
  
      if (d3.select("#circle1").empty()) {
      value_2= "clear1"
    }  else {
    circle = d3.select("#circle1").datum()
    var intersect_value_new=(pointInPolygon(circle, polygon_new)
        || polygonEdges(polygon_new).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; }));
    
    var intersect_value_old=(pointInPolygon(circle, polygon_old)
        || polygonEdges(polygon_old).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; }));
    if (intersect_value_new==true |intersect_value_old==true ) {
      value_2="overlap1"
    } else {
      value_2="clear1"
    }
}
      if (d3.select("#circle2").empty()) {
      value_3= "clear2"
    }  else {
    circle = d3.select("#circle2").datum()
    var intersect_value_new=(pointInPolygon(circle, polygon_new)
        || polygonEdges(polygon_new).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; }));
    
    var intersect_value_old=(pointInPolygon(circle, polygon_old)
        || polygonEdges(polygon_old).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; }));
    if (intersect_value_new==true |intersect_value_old==true ) {
      value_3="overlap2"
    } else {
      value_3= "clear2"
    }
}
  return (value_1 +" " + value_2 +" " + value_3) 
  

}
  
  function polygonEdges(polygon) {
    return polygon.map(function(p, i) {
      return i ? [polygon[i - 1], p] : [polygon[polygon.length - 1], p];
    });
  }
  
  function pointInPolygon(point, polygon) {
    for (var n = polygon.length, i = 0, j = n - 1, x = point[0], y = point[1], inside = false; i < n; j = i++) {
      var xi = polygon[i][0], yi = polygon[i][1],
          xj = polygon[j][0], yj = polygon[j][1];
      if ((yi > y ^ yj > y) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }
  
  function pointLineSegmentDistance(point, line) {
    var v = line[0], w = line[1], d, t;
    return Math.sqrt(pointPointSquaredDistance(point, (d = pointPointSquaredDistance(v, w))
        ? ((t = ((point[0] - v[0]) * (w[0] - v[0]) + (point[1] - v[1]) * (w[1] - v[1])) / d) < 0 ? v
        : t > 1 ? w
        : [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])])
        : v));
  }
  
  function pointPointSquaredDistance(v, w) {
    var dx = v[0] - w[0], dy = v[1] - w[1];
    return dx * dx + dy * dy;
  }

// # Initialize visualization
// # ------------------------------
var width   = 1300
var height  = 400
var margin  = {top:0,bottom:0,left:0,right:0};

var svg     = d3.select("body").append("svg")
                .attr("transform", "translate(" + (margin.left) + "," + (-740) + ")")
                .attr("align","top")
                .attr("width", width + margin.left + margin.right)
                .attr("height",height + margin.top + margin.bottom)

// # Define functions
// # ------------------------------

// # Draw vis
var draw_vis  = function() {
  
    point = svg.selectAll(".circle")
             .data(point_pos_old)
             .enter()
             .append("circle")

    point.attr("cx", function(d, i) { return d.pos_x; })
         .attr("cy", function(d, i) { return d.pos_y })
         .attr("r", 4)
         .attr("opacity",0.2)
         .attr("class", "circle")
         .transition()
         .duration(update_second_new)
         .attr("cx", function(d, i) { return point_pos_new[i].pos_x; })
         .attr("cy", function(d, i) { return point_pos_new[i].pos_y; })

    var lineFunction = d3.svg.line()
                         .x(function(d) { return d[0]; })
                         .y(function(d) { return d[1]; })
                        .interpolate("linear");

    line = svg.selectAll(".path")
            .data(line_pos_old)
            .enter()
            .append("path")

    line.attr("d", function(d,i) { return lineFunction(d.ddd);})
        .attr("stroke", "#0847af")
        .attr("opacity", function(d,i) {
          intersect=intersects(line_pos_new[i].ddd,line_pos_old[i].ddd)
          if (intersect=="clear0 clear1 clear2" | mouseover_event==false) {
            return(1)
          } else {
            return(0.1)
          }})
        .attr("class", function(d,i) {
          return("line " + intersects(line_pos_new[i].ddd,line_pos_old[i].ddd))})
        .transition()
        .duration(update_second_new)
        .style("stroke", "#575b5e")
        .attr("d", function(d,i) {return lineFunction(line_pos_new[i].ddd);})

    if (count_gap>10 & Math.max(...line_pos_new_dist)>min_text & count_id<2) {
    
    console.log(Math.max(...line_pos_new_dist))
    dist_max = line_pos_new_dist.indexOf(Math.max(...line_pos_new_dist))
    console.log(line_pos_new[dist_max].ddd)
    
    if (intersects(line_pos_new[dist_max].ddd, line_pos_old[dist_max].ddd)=="clear0 clear1 clear2"){
    if (line_pos_new[dist_max].ddd[0][0]>20 & line_pos_new[dist_max].ddd[1][0]<width-20 & 
      line_pos_new[dist_max].ddd[0][1]>20 & line_pos_new[dist_max].ddd[1][1]<height-40) {

    count_gap = 0
    dist_max_store.push(line_pos_new[dist_max].ddd)
    
    startingPath = lineFunction(line_pos_new[dist_max].ddd)
    var textPath = svg.append("defs").append("path")
      .attr("id", "textPath"+count_id)
      .attr("d", startingPath);
    
    var text = svg
      .append("a")
      .append("line")
      .attr("id",'line'+k)
       .attr("class",'test')

      .style("stroke-width", 5)  
      .style("stroke", "red")    
      .attr("x1", line_pos_new[dist_max].ddd[0][0])
      .attr("y1", line_pos_new[dist_max].ddd[0][1]) 
      .attr("x2", line_pos_new[dist_max].ddd[1][0])
      .attr("y2", line_pos_new[dist_max].ddd[1][1])
      .datum([".overlap"+count_id, "#circle"+count_id,"#line"+count_id])
      .on("mouseover", function (d) {
        mouseover_event=true
         d3.selectAll(d[0]).transition().duration(200).attr("opacity",0.1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0.1)
         d3.selectAll(".test").transition().duration(0).attr("opacity",0)
        d3.selectAll(d[2]).transition().duration(0).attr("opacity",1)

      })
      .on("mouseout", function(d) {
mouseover_event=false
          d3.selectAll(d[0]).transition().duration(200).attr("opacity",1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0)
         d3.selectAll(".test").transition().duration(0).attr("opacity",1)

      });

    var text = svg.append("text")
      .append("textPath")
      .attr("xlink:href", "#textPath"+count_id)
      .html("<a href='"+label_url[count_id]+"'>"+label[count_id]+"</a>")
      .attr('font-size', '30px')
      .attr('font-family', 'Source Sans Pro,sans-serif')
      .style('color', 'red')
      .datum([".overlap"+count_id, "#circle"+count_id])
      .on("mouseover", function (d) {
        mouseover_event=true
         d3.selectAll(d[0]).transition().duration(200).attr("opacity",0.1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0.1)
         d3.selectAll(".test").transition().duration(0).attr("opacity",0)
        d3.selectAll(d[2]).transition().duration(0).attr("opacity",1)

      })
      .on("mouseout", function(d) {
          mouseover_event=false
          d3.selectAll(d[0]).transition().duration(200).attr("opacity",1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0)
         d3.selectAll(".test").transition().duration(0).attr("opacity",1)

      });

      x1=line_pos_new[dist_max].ddd[0][0]
      y1=line_pos_new[dist_max].ddd[0][1]
      x2=line_pos_new[dist_max].ddd[1][0]
      y2=line_pos_new[dist_max].ddd[1][1]

      x_mid =(x1 + x2)/2
      y_mid =(y1 + y2)/2
      point_pos_dist_x  = x1 - x2
      point_pos_dist_y  = y1 - y2
      point_pos_dist    = Math.sqrt(Math.pow(point_pos_dist_x,2) + Math.pow(point_pos_dist_y,2))
 

  function positionCircle(circle) {
    circle
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; });
  }

      var circle = svg.append("circle")
                    .attr("id", "circle"+count_id)
                    .datum([x_mid, y_mid,point_pos_dist/2 ])
                    .call(positionCircle)
                    .attr("r",function(d) {return d[2]})
                    .attr("opacity",0)


      count_id = count_id + 1

}
    }
}
    if (mouseover_event==false) {
    for (var k = 0; k < Object.keys(dist_max_store).length; k++) {

   startingPath = lineFunction(dist_max_store[k])
    var textPath = svg.append("defs").append("path")
      .attr("id", "textPath"+k)
      .attr("d", startingPath);
    
       var text = svg
      .append("a")
      .append("line")
      .attr("id",'line'+k)
       .attr("class",'test')
      .style("stroke-width", 5)  
      .style("stroke", "red")    
      .attr("x1", dist_max_store[k][0][0])
      .attr("y1", dist_max_store[k][0][1]) 
      .attr("x2", dist_max_store[k][1][0])
      .attr("y2", dist_max_store[k][1][1])
      .datum([".overlap"+k, "#circle"+k,"#line"+k ])
      .on("mouseover", function (d) {
        mouseover_event=true
         d3.selectAll(d[0]).transition().duration(200).attr("opacity",0.1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0.1)
         d3.selectAll(".test").transition().duration(0).attr("opacity",0)
        d3.selectAll(d[2]).transition().duration(0).attr("opacity",1)

      })
      .on("mouseout", function(d) {
mouseover_event=false
          d3.selectAll(d[0]).transition().duration(200).attr("opacity",1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0)
         d3.selectAll(".test").transition().duration(0).attr("opacity",1)

      });

    var text = svg.append("text")
          .style('color', 'red')
      .append("textPath")
      .attr("xlink:href", "#textPath"+k)
      .html("<a href='"+label_url[k]+"'>"+label[k]+"</a>")
      .attr('font-size', '30px')
      .attr('font-family', 'Source Sans Pro,sans-serif')
      .datum([".overlap"+k, "#circle"+k,"#line"+k])
      .on("mouseover", function (d) {
        mouseover_event=true
         d3.selectAll(d[0]).transition().duration(200).attr("opacity",0.1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0.1)
         d3.selectAll(".test").transition().duration(0).attr("opacity",0)
        d3.selectAll(d[2]).transition().duration(0).attr("opacity",1)

      })
      .on("mouseout", function(d) {
mouseover_event=false
          d3.selectAll(d[0]).transition().duration(200).attr("opacity",1)
        d3.selectAll(d[1]).transition().duration(200).attr("opacity",0)
         d3.selectAll(".test").transition().duration(0).attr("opacity",1)

      });

 



    }
}

    count = count+1
    count_gap = count_gap + 1

}

// # Update line position
var update_line_pos = function() {

  line_pos_old = []
  line_pos_new = []
  line_pos_new_dist =[]

  // # Update point position
  for (var j = 0; j < point_number; j++) {

    point_pos_x_start = point_pos_old[j].pos_x
    point_pos_y_start = point_pos_old[j].pos_y
    
    point_pos_x_start_new = point_pos_new[j].pos_x
    point_pos_y_start_new = point_pos_new[j].pos_y

    for (var k = 0; k < point_number; k++) {

      point_pos_x_end = point_pos_old[k].pos_x
      point_pos_y_end = point_pos_old[k].pos_y

      point_pos_x_end_new = point_pos_new[k].pos_x
      point_pos_y_end_new = point_pos_new[k].pos_y

      point_pos_dist_x  = point_pos_x_end_new - point_pos_x_start_new
      point_pos_dist_y  = point_pos_y_end_new - point_pos_y_start_new
      point_pos_dist    = Math.sqrt(Math.pow(point_pos_dist_x,2) + Math.pow(point_pos_dist_y,2))
 
      if (point_pos_dist > 0 & point_pos_dist < dist_min ) {
     
        line_pos_old.push({

          ddd:[[point_pos_x_start,point_pos_y_start],[point_pos_x_end,point_pos_y_end]]
      
        });

        line_pos_new.push({

          ddd:[[point_pos_x_start_new,point_pos_y_start_new],[point_pos_x_end_new,point_pos_y_end_new]]
      
        });

        line_pos_new_dist.push(point_pos_dist);

      }
    }

  }
}

// # Update point position
var update_point_pos  = function() {

  // # Store old point position
  point_pos_old = point_pos_new
  point_pos_new = []

  // # Update point position
  for (var j = 0; j < point_number; j++) {

    // # Generate coordinates

    point_pos_x = point_pos_old[j].pos_x + Math.random() * pos_random_factor_x * (Math.round(Math.random()) * 2 - 1)
    point_pos_y = point_pos_old[j].pos_y + Math.random() * pos_random_factor_y *(Math.round(Math.random()) * 2 - 1)
    if (point_pos_y>height-20) {
      point_pos_y = height-20 - Math.random() *10
    }

    if (point_pos_y<0) {
      point_pos_y = Math.random() *10
    }
    if (point_pos_x>width) {
      point_pos_x = width - Math.random() *10
    }

    if (point_pos_x<0) {
      point_pos_x =  Math.random() *10
    }

    point_pos_new.push({
      pos_x: point_pos_x,
      pos_y: point_pos_y
    });

  } 
  
  update_line_pos()

  // # Update points
  svg.selectAll(".circle").remove()
  update_second_new = Math.max(update_second_new-80,400)
  draw_vis()
  setTimeout(update_point_pos, update_second_new);


}

// # Execute functions
// # ------------------------------
setTimeout(update_point_pos, update_second_new);
update_point_pos()


