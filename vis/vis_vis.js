// Start Vis
function start_vis(vis_id, vis_div,vis_script) {

  // Definition
  var js_script=vis_script

   // Load Function
  function loadScript(url, callback)
  {
      // Adding the script tag to the head as suggested before
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.charset = "utf-8";
  
      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;
  
      // Fire the loading
      head.appendChild(script);
  }
  
  var js_script_fun = function() {
     update_point_pos(false)
  };
  
    d3.selectAll("svg > *").remove();
  d3.selectAll("svg").remove();
  loadScript(js_script, js_script_fun);

}


// Stop Vis
// --------
function stop_vis(vis_id,vis_script) {



  // Definition
  var js_script=vis_script

   // Load Function
  function loadScript(url, callback)
  {
      // Adding the script tag to the head as suggested before
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.charset = "utf-8";
  
      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;
  
      // Fire the loading
      head.appendChild(script);
  }
  
  var js_script_fun = function() {
     update_point_pos(true)
  };
  
  loadScript(js_script, js_script_fun);


  // Initialize
  d3.selectAll("svg > *").remove();
  d3.selectAll("svg").remove();
}



