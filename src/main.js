//require('exports-loader?file!./bootstrap/js/dist/.js')
//import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


setInterval(() => {
  getBusData();
}, 5000);

$(() => {

  getBusData();

});



function rebuildTransit(data) {
  let stop1 = "";
  let stop2 = "";
  console.log(data);
  data.resultSet.arrival.forEach(bus => {
    let arrival;
    if (bus.estimated == undefined) {    
      arrival = Math.floor(((bus.scheduled - Date.now()) / 1000) / 60);      
    } else {
      arrival = Math.floor(((bus.estimated - Date.now()) / 1000) / 60);
    }    

    if (bus.locid == 7797) {
      stop1 +=
        `<div class="row">
      <div id="test" class="col-12 rounded busses">                
        <h3>ETA ${arrival}: (${bus.tripID})  ${bus.fullSign}</h3>
      </div>
  </div>
  <hr>`
    } else if (bus.locid == 7642) {
      stop2 +=
      `<div class="row">
      <div id="test" class="col-12 rounded busses">                
      <h3>ETA ${arrival}: (${bus.tripID})  ${bus.fullSign}</h3>
      </div>
  </div>
  <hr>`
    }

  });


  let sortedDetour = data.resultSet.detour.sort((a, b) => {
    return a.begin - b.begin;
  })
  let detour = "";
  sortedDetour.forEach(d => {
    if (d.header_text != "") {

      detour +=
        `<div class="row">
      <div id="test" class="col-12 rounded detour">                
      <h4>${d.id}</h4>
      <p>${d.desc}</p>
      </div>
      </div>
      <hr>`
    }
  })

  //busses += detour;

  $("#stop1").html(stop1)

  $("#stop2").html(stop2)


  //$("#busses").html(busses)
}


function getBusData() {

  $.ajax({
    url: `https://developer.trimet.org/ws/V2/arrivals`,
    data: {
      locIDs: "7797,7642",
      appID: process.env.TRIMET_KEY,
      json: true
    },
    dataType: 'jsonp',
    success: function (json) {
      rebuildTransit(json)
    },
    error: function () {
      console.log("Error");
    }
  });

}