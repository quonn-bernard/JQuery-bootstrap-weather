const lat = document.getElementById("lat");
const lng = document.getElementById("lng");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    getWeather(position.coords.latitude, position.coords.longitude)
}

const proxy = 'https://cors-anywhere.herokuapp.com/';

let d = new Date();
let n = d.getDay()

function getWeather(lat, lng) {
    const url = `${proxy}https://api.darksky.net/forecast/422de9e573557baa60befe3908baba9f/${lat},${lng}`;
    const city = `${proxy}http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=422de9e573557baa60befe3908baba9f`;
    // fetch(city)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (myJson) {
    //     console.log(myJson, 'd')
    //     })
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson.timezone)
            $('.tz').html(myJson.timezone)
            myJson.daily.data.map((data, i) => {
                console.log(data.icon)
                getHigh(i, data)
                getLow(i, data)
                getCondition(i, data)

                if (i === 0) {
                    getDayOfWeek(n, i)
                } else if (i > 0 && (n + i) < 7 && i) {
                    getDayOfWeek(n + i, i)
                } else if (i > 0 && i < 7 && (n + i) === 7) {
                    getDayOfWeek(0, i)
                } else if (i > 0 && i < 8 && (n + i) > 7) {

                    if ((n + i) % 7 > 1) {
                        // console.log(n + i)
                        getDayOfWeek((n - 1), i)
                    }
                    if ((n + i) % 7 > 2) {
                        getDayOfWeek((n + i) - 9, i)
                    }
                }
                setIcons(i, data.icon, document.querySelector(`.icon-2-${i}`))
                setIcons(i, data.icon, document.querySelector(`.icon-${i}`))
            })
        });
}

function getHigh(index, data) {
    $(`.hi-${index}`).html(`${Math.round(data.apparentTemperatureHigh)}&#176`)
}

function getLow(index, data) {
    $(`.lo-${index}`).html(`${Math.round(data.apparentTemperatureLow)}&#176`)
}

function getDayOfWeek(d, i) {

    let day;
    switch (d) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
    $(`.dow-${i}`).html(day)
}

function getCondition(i, data) {
    $(`.cond-${i}`).html(data.summary)
}

function setIcons(i, icon, iconID) {
    const skycons = new Skycons({ color: "black" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

function toggleTheme() {
    $(".toggle").click(function(){
        $('.toggle').toggleClass("bg-dark").toggleClass("bg-success").toggleClass("text-success").toggleClass("text-white")
        $('#weather-box').toggleClass("bg-dark");
        $('div.row > div > h1').toggleClass("text-white").toggleClass("text-dark")
         $("div.tab-pane > h4, .nav-link > p").toggleClass("text-success").toggleClass("text-warning");
        
      });
      
}

toggleTheme();
getLocation();
getDayOfWeek();