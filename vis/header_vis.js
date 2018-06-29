// # Initialize variables
// # ------------------------------

// # Basic
var point_number  = 3
var update_second = 400
var update_second_new = 400
var dist_min      = 100

// # Start Position
pos_x_start       = 20
pos_y_start       = 10
pos_random_factor_x = 20
pos_random_factor_y = 40

// # Text
font                  = false
min_text              = 40

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

// # Initialize visualization
// # ------------------------------
var width   = 90
var height  = 24

var margin  = {top:0,bottom:0,left:0,right:0};

var svg     = d3.select("#chart_header").append("svg")
                .attr("align","top")
                .attr("width", width + margin.left + margin.right)
                .attr("height",height + margin.top + margin.bottom)

                .append("g")
                .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

// # Define functions
// # ------------------------------

// # Draw vis
var draw_vis  = function() {

    var g = svg.append("g")
  
    point = g.selectAll(".circle")
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
         // .ease("easeSin")           // control the speed of the transition

         .attr("cx", function(d, i) { return point_pos_new[i].pos_x; })
         .attr("cy", function(d, i) { return point_pos_new[i].pos_y; })

    var lineFunction = d3.svg.line()
                         .x(function(d) { return d[0]; })
                         .y(function(d) { return d[1]; })
                        .interpolate("linear");

    line = g.selectAll(".path")
            .data(line_pos_old)
            .enter()
            .append("path")

    line.attr("d", function(d,i) { return lineFunction(d.ddd);})
        .style("stroke", "#0847af")
        .attr("class", "line")
        .transition()
        .duration(update_second_new)
        .style("stroke", "#75797c")
        .attr("d", function(d,i) {return lineFunction(line_pos_new[i].ddd);})

 
    if (Math.max(...line_pos_new_dist)>min_text | font==true) {
    
    font=true
    
    dist_max = line_pos_new_dist.indexOf(Math.max(...line_pos_new_dist))
    startingPath = lineFunction(line_pos_new[dist_max].ddd)
    
    var textPath = svg.append("defs").append("path")
      .attr("id", "textPath")
      .attr("d", startingPath)
    
    var text = svg.append("text").append("textPath")
      .attr("xlink:href", "#textPath")
      .text("Home")
      .attr('fill', '#ff0202')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold')
   }



}


// # Update line position
var update_line_pos = function() {

  line_pos_old = []
  line_pos_new = []
  line_pos_new_dist = []

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

          ddd:[[point_pos_x_start,point_pos_y_start, point_pos_dist],[point_pos_x_end,point_pos_y_end, point_pos_dist]]
      
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
    if (point_pos_y>height) {
      point_pos_y = height - Math.random() *10
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
  // svg.selectAll(".line").remove()
  update_second_new = Math.max(update_second_new-80,300)
  draw_vis()
  setTimeout(update_point_pos, update_second_new);


}

// # Execute functions
// # ------------------------------
// setInterval(update_point_pos,update_second_new)
setTimeout(update_point_pos, update_second_new);
// update_point_pos()


