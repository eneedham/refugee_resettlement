
var map = L.map('map', {
center: [40.000, -75.1090],
zoom: 11,
zoomControl:false
});


var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
subdomains: 'abcd',
minZoom: 0,
maxZoom: 20,
ext: 'png'
}).addTo(map);;

//*****************************************************
//Global Variables
sql = new cartodb.SQL({user: 'eneedham', format: 'geojson'});
sql2 = new cartodb.SQL({user: 'eneedham'});
var cartoDBUserName = "eneedham";
var sum = "(";
var bins;
var myList = [];
var myData;
var popUpcontent = "Feature Score: ";
var dens;
var theLayer;
var myBins =[];
var uniques;

$(".legend").hide();
$("#redo").hide();
$(".selectedfactors").hide();

// Array.prototype.contains = function(v) {
//     for(var i = 0; i < this.length; i++) {
//         if(this[i] === v) return true;
//     }
//     return false;
// };
//
// Array.prototype.unique = function() {
//     var arr = [];
//     for(var i = 0; i < this.length; i++) {
//         if(!arr.contains(this[i])) {
//             arr.push(this[i]);
//         }
//     }
//     return arr;
// };


//Default Zoom
var defaultViewFunc = function(){
    map.setView([40.000, -75.1090], 11);
};

//Default Zoom button
$("#reset-zoom").click(function(){
  defaultViewFunc();
});

// var popupfunc = function(x){
//   popUpcontent = x.properties.commercial;
// };

//Function to zoom in & add popUp
var eachFeature = function(feature, layer) {
  // layer.bindPopup();
  // layer.on('click', function (e) {
  //   var bounds = this.getBounds();
  //   // map.fitBounds(bounds);
  //   // layer.bindPopup(feature.properties.total);
  //   $(".welcome").empty();
  //
  //   layer.openPopup();
  // });
  layer.on('mouseover', function(){
    // layer.bindPopup(feature.properties.commercial);
      // popupfunc(feature);
      // layer.openPopup(popUpcontent);
      $(".sel-ethnicity").append("Census Block Score:" + feature.properties.total);

      layer.setStyle({ fillOpacity: 1, weight: 5});
  });

  // Un-highlight the marker on hover out
  layer.on('mouseout', function(){
    $(".sel-ethnicity").empty();
      layer.setStyle({fillOpacity: 0.5, weight: 1});
  });
};
// feature, layer, other
function eachTract(feature, layer) {
// popUpcontent = 'quartier ' + feature.properties.commercial;
  // layer.bindPopup('quartier ' + feature.properties.commercial);
  layer.on({
    mouseover: function(e){
      layer.setStyle({ fillOpacity: 1, weight: 5});
      // layer.openPopup();

        info.update(layer.feature.properties);
        // info.update(layer.feature.properties);
    },
    mouseout: function(e) {
      layer.setStyle({fillOpacity: 0.5, weight: 1});
      // layer.closePopup();
      info.update();
    },
    click: function (e){
      var bounds = this.getBounds();
      map.fitBounds(bounds);
    },
  });
}

$('#demolist li a').on('click', function(){
  $('.sel-ethnicity').empty();
  $('#all').prop('checked', false);
  $('#elem').prop('checked', false);
  $('#middle').prop('checked', false);
  $('#high').prop('checked', false);
  $('#food').prop('checked', false);
  $('#trans').prop('checked', false);
  $('#lib').prop('checked', false);
  $('#com').prop('checked', false);
  $('#health').prop('checked', false);
  sum = "(";
  dens = undefined;
  dens = $(this).text();
  dens2 = dens.toLowerCase();
  sum = sum+dens2;
});

$('.dropdown-menu').on('click', function(){
  $('.sel-ethnicity').append(dens);
});

var myStyle = function (feature){
  if(feature.properties.total <= myList[0]){
    return {fillColor: "#053061", fillOpacity: 0.5, color: "#434343", weight: 1};
    // myBins.push(feature.properties.total);
  }
  if(feature.properties.total > myList[0] && feature.properties.total <= myList[1]){
    return {fillColor: "#2166ac", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[1] && feature.properties.total <= myList[2]){
    return {fillColor: "#4393c3", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[2] && feature.properties.total <= myList[3]){
    return {fillColor: "#92c5de", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[3] && feature.properties.total <= myList[4]){
    return {fillColor: "#d1e5f0", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[4] && feature.properties.total <= myList[5]){
    return {fillColor: "#f7f7f7", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[5] && feature.properties.total <= myList[6]){
    return {fillColor: "#fddbc7", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[6] && feature.properties.total <= myList[7]){
    return {fillColor: "#f4a582", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[7] && feature.properties.total <= myList[8]){
    return {fillColor: "#d6604d", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[8] && feature.properties.total <= myList[9]){
    return {fillColor: "#b2182b", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  if(feature.properties.total > myList[9]){
    return {fillColor: "#67001f", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
  else{
    return {fillColor: "#B3ADA4", fillOpacity: 0.5, color: "#434343", weight: 1};
  }
};
//
// function getColor(d) {
//     return d == "Lowest Score" ? '#053061' :
//            d == "1 "             ? "#2166ac" :
//            d == "Low "             ? "#4393c3":
//            d == "3 "            ? "#92c5de":
//            d == "4 "            ? "#d1e5f0":
//            d == "Moderate "            ? "#f7f7f7":
//            d == "6 "            ? "#fddbc7":
//            d == "7 "            ? "#f4a582":
//            d == "High "            ? "#d6604d":
//            d == "9 "            ? "#b2182b":
//            d == "Highest Score"            ? "#67001f":
//                                  "#B3ADA4";
//
// }

function getColor(d) {
    return d == "Lowest" ? '#053061' :
           d == "Low "         ? "#4393c3":
           d == "Moderate-Low" ? "#d1e5f0":
           d == "Moderate "    ? "#f7f7f7":
           d == "Moderate-High"? "#f4a582":
           d == "High "        ? "#d6604d":
           d == "Highest"? "#67001f":
                                 "#B3ADA4";

}

var vuln_legend = L.control({position: 'bottomright'});

vuln_legend.onAdd = function (map, list) {
    var div = L.DomUtil.create('div', 'info legend title vuln_legend');
        grades = ["Lowest", "Low ", "Moderate-Low", "Moderate ", "Moderate-High", "High ", "Highest"];

    div.innerHTML += '<b>Resettlement Suitability</b><br>';  // don't forget the break tag

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
           (grades[i] ? grades[i] + '<br>' : '+');
    }

    return div;
};


  $('#all').change(function() {
    if($('#all').is(":checked")){
      $('#elem').prop('checked', true);
      $('#middle').prop('checked', true);
      $('#high').prop('checked', true);
      $('#food').prop('checked', true);
      $('#trans').prop('checked', true);
      $('#lib').prop('checked', true);
      $('#com').prop('checked', true);
      $('#health').prop('checked', true);
    }
    if(!$('#all').is(":checked")){
      $('#elem').prop('checked', false);
      $('#middle').prop('checked', false);
      $('#high').prop('checked', false);
      $('#food').prop('checked', false);
      $('#trans').prop('checked', false);
      $('#lib').prop('checked', false);
      $('#com').prop('checked', false);
      $('#health').prop('checked', false);
    }
  });

var factorsList = [];


  $("#submit").click(function() {
     vuln_legend.addTo(map);
    //$(".legend").show();
    $("#redo").show();
    $(".selectedfactors").show();
    $(".factors-title").hide();
    $(".checkboxes").hide();
    $(".dropdown").hide();
    $("#submit").hide();


    $('#submit').prop('disabled', true);
    $('#redo').prop('disabled', false);
    $('.checkbox').prop('disabled', true);
    // x = $("input[type='checkbox']").val();
    // console.log($("input[type='checkbox']").val());
    // $('.sel-ethnicity').append($('.checkbox').val());

    if ($('#elem').is(":checked")) {
      sum = sum+"+elementary";
      $('.sel-factors').append("Elementary Schools" + "<br>");
      factorsList.push("elementary");
    }
    if ($('#middle').is(":checked")) {
      sum = sum+"+middle";
      $('.sel-factors').append("Middle Schools" + "<br>");
      factorsList.push('middle');
    }
    if ($('#high').is(":checked")) {
      sum = sum+"+high";
      $('.sel-factors').append("High Schools" + "<br>");

      factorsList.push('high');
    }
    if ($('#food').is(":checked")) {
      sum = sum+"+food";
      $('.sel-factors').append("Walkable Access to Food" + "<br>");
      factorsList.push('food');
    }
    if ($('#trans').is(":checked")) {
      sum = sum+"+transit_qm+transit_hm";
      $('.sel-factors').append("Public Transit" + "<br>");
      factorsList.push('transit_qm');
      factorsList.push('transit_hm');
    }
    if ($('#lib').is(":checked")) {
      sum = sum+"+library";
      $('.sel-factors').append("Libraries" + "<br>");
      factorsList.push('library');
    }
    if ($('#com').is(":checked")) {
      sum = sum+"+commercial";
      $('.sel-factors').append("Commercial Corridors" + "<br>");
    }
    if ($('#health').is(":checked")) {
      sum = sum+"+health";
      $('.sel-factors').append("Health Centers" + "<br>");
    }
    if (sum === "("){
      alert("Please pick at least one parameter");
    }

    sql2.execute( "SELECT unnest(CDB_QuantileBins(array_agg"+sum+")::numeric[],10)) as total2 from blockgroups_final_res").done(function(result) {
    bins = result;
    for (i = 0; i < bins.rows.length; i++){
        myList.push(bins.rows[i].total2);}
      });

    sql.execute("SELECT geoid10, the_geom, commercial, elementary, food, health, library, transit_qm, transit_hm,"+sum+") as total FROM blockgroups_final_res").done(function(geojson) {
      myData = geojson;

    theLayer = L.geoJson(geojson, {
        onEachFeature: eachTract,
        style: myStyle,
      }).addTo(map).addData(myData);
    });
    });

  $("#redo").click(function(){
    sum = "(";
    myList =[];
    if (map.hasLayer(theLayer)){
        map.removeLayer(theLayer);
    }
    if (map.hasLayer(vuln_legend)){
        map.removeLayer(vuln_legend);
    }
    $(".legend").hide();
    $("#redo").hide();
    $(".selectedfactors").hide();
    $(".factors-title").show();
    $(".checkboxes").show();
    $(".dropdown").show();
    $("#submit").show();

    $('.sel-ethnicity').empty();
    $('.sel-factors').empty();

    $('#submit').prop('disabled', false);
    $('.checkbox').prop('disabled', false);
    $('.checkbox').prop('checked', false);
    $('#redo').prop('disabled', true);
  });


  var info = L.control();

  info.onAdd = function (yikes) {
      this._div = L.DomUtil.create('div', 'info box'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (layer) {

      // x = Math.round(layer.total);
      this._div.innerHTML = '<h4>Census Block Score</h4>' +  (layer ?
          '</b><br />' + 'Block ID' + ' ' +'<b>' + layer.geoid10 + '</b><br />' +
          'Total Score' + ' ' + '<b>' + Math.round(layer.total*100)/100 + '</b>'

          : 'Hover over a Census Block');
  };

  info.addTo(map);
