//require('exports-loader?file!./bootstrap/js/dist/.js')
//import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
//import request from 'request'
import './styles.css';
//$(document).ready(function() {

//});

// $(window).click(() => {

//     console.log("CLicked");

// });



setInterval(() => {
    getVehicleData();
}, 1000);

//getVehicleData();
'45.520662, -122.677523'

//http://developer.trimet.org/ws/V1/TripUpdate/
function getVehicleData() {
    $.ajax({
        url: `https://developer.trimet.org/ws/v2/vehicles`,
        data: {
            ids: "3218",
            appID: process.env.TRIMET_KEY
        },
        dataType: 'jsonp',
        success: function (json) {
            $('#vehicle').html(json.resultSet.vehicle[0].longitude + "<br>");
            $('#vehicle').append(json.resultSet.vehicle[0].latitude);             
             console.log(json);
            // console.log("Here");
            
        },
        error: function () {
            console.log("Error");
        }
    });
}