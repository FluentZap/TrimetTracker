//require('exports-loader?file!./bootstrap/js/dist/.js')
//import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
//$(document).ready(function() {

//});

$(window).click(() => {

    console.log("CLicked");

});

$.ajax({
    url: `http://magicseaweed.com/api/40ea30398f379da2a1ffbe3a2a2a98e4/forecast/`,
    data: {
        spot_id: 314,
        //fields: "localTimestamp,wind.*"
    },
    dataType: 'jsonp',
    success: function (json) {
        console.log(json);
        json.forEach(element => {            
            console.log(new Date(element.localTimestamp * 1000).toUTCString());
            $("#direction").removeClass().addClass(`msw-swa msw-swa-${element.wind.direction}`)            
        });

    },
    error: function () {
        console.log("Error");
    }
});

// $.get(`http://magicseaweed.com/api/40ea30398f379da2a1ffbe3a2a2a98e4/forecast/?spot_id=314`).then((response) => {
//     console.log(response);
// })

// $.get(`https://api.spacexdata.com/v3/launches/latest`).then((response) => {
//     console.log(response);
// })

// $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=[API-KEY-GOES-HERE]`)
// .then(function(response) {
//       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }).fail(function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);