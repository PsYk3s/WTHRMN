const locationName = document.getElementById("city-name")
const timeNow = document.getElementById("time")
const warnings = document.getElementById("warnings")
const currentConditions = document.getElementById("current-conditions")
const currentLow = document.getElementById("current-low-temp")
const currentHigh = document.getElementById("current-high-temp")
const currentSunrise = document.getElementById("current-sunrise-time")
const currentSunset = document.getElementById("current-sunset-time")
const currentMoonphase = document.getElementById("current-moonphase-state")
const currentWind = document.getElementById("current-wind-speed")
const currentPrec = document.getElementById("current-rain")
const speed = document.getElementById("speed")
const amount = document.getElementById("amount")
const degCelBtn = document.getElementById("degrees-celsius-btn")
const farBtn = document.getElementById("fahrenheit-btn")
const todayBtn = document.getElementById("todayAnc")
const tomorrowBtn = document.getElementById("tomorrowAnc")
const showHideBtn = document.getElementById("change-location-btn")
const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById("Search")
const dayOneLow = document.getElementById("day-one-low")
const dayTwoLow = document.getElementById("day-two-low")
const dayThreeLow = document.getElementById("day-three-low")
const dayFourLow = document.getElementById("day-four-low")
const dayFiveLow = document.getElementById("day-five-low")
const dayOneHigh = document.getElementById("day-one-high")
const dayTwoHigh = document.getElementById("day-two-high")
const dayThreeHigh = document.getElementById("day-three-high")
const dayFourHigh = document.getElementById("day-four-high")
const dayFiveHigh = document.getElementById("day-five-high")
const dayOneDay = document.getElementById("day-one-day")
const dayTwoDay = document.getElementById("day-two-day")
const dayThreeDay = document.getElementById("day-three-day")
const dayFourDay = document.getElementById("day-four-day")
const dayFiveDay = document.getElementById("day-five-day")
const dayOneDate = document.getElementById("day-one-date")
const dayTwoDate = document.getElementById("day-two-date")
const dayThreeDate = document.getElementById("day-three-date")
const dayFourDate = document.getElementById("day-four-date")
const dayFiveDate = document.getElementById("day-five-date")
const dayOneContainer = document.getElementById("day-one-container")
const dayTwoContainer = document.getElementById("day-two-container")
const dayThreeContainer = document.getElementById("day-three-container")
const dayFourContainer = document.getElementById("day-four-container")
const dayFiveContainer = document.getElementById("day-five-container")
const hoursContainer = document.getElementById("hours-container")
const fifteenDayContainer = document.getElementById("days-container")

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let tempType = "Celsius";
let daySelect = 0;
let locationSearched = 'johannesburg'

const apiLink = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const key = 'P5VJ3EUHTKFRAKTQPLXYM42ZE'

const fetchApi = () => {
    
    const currentLink = `${apiLink}${locationSearched}?unitGroup=${tempType == "Celsius" ? "metric" : "us"}&key=${key}&contentType=json`

    fetch(currentLink)

    .then(function (response) {
        return response.json();
    })

    .then(function (response) {
        locationName.innerText = response.address;
        timeNow.innerText = response.currentConditions.datetime.slice(0, 5);

        //Current weather conditions
        currentConditions.innerHTML = `<span id="${response.days[daySelect].icon}">${response.days[daySelect].conditions}</span>`;
        currentLow.innerText = Math.round(response.days[daySelect].tempmin);
        currentHigh.innerText = Math.round(response.days[daySelect].tempmax);
        currentPrec.innerText = Math.round(response.days[daySelect].precip)
        currentSunrise.innerText = response.days[daySelect].sunrise;
        currentSunset.innerText = response.days[daySelect].sunset;
        currentMoonphase.innerText = moonPhaseCheck(response.days[daySelect].moonphase)
        currentWind.innerHTML = `${Math.round(response.days[daySelect].windspeed)}<span id="direction">${windDirectionCheck(response.days[daySelect].winddir)}</span>`
        warnings.innerText = response.alerts.length > 0 ? response.alerts[0].event : "None";

        //Five day forecast
        dayOneLow.innerText = Math.round(response.days[0].tempmin);
        dayTwoLow.innerText = Math.round(response.days[1].tempmin);
        dayThreeLow.innerText = Math.round(response.days[2].tempmin);
        dayFourLow.innerText = Math.round(response.days[3].tempmin);
        dayFiveLow.innerText = Math.round(response.days[4].tempmin);
        
        dayOneHigh.innerText = Math.round(response.days[0].tempmax);
        dayTwoHigh.innerText = Math.round(response.days[1].tempmax);
        dayThreeHigh.innerText = Math.round(response.days[2].tempmax);
        dayFourHigh.innerText = Math.round(response.days[3].tempmax);
        dayFiveHigh.innerText = Math.round(response.days[4].tempmax);

        dayOneDay.innerText = weekday[new Date(response.days[0].datetime).getDay()]
        dayTwoDay.innerText = weekday[new Date(response.days[1].datetime).getDay()]
        dayThreeDay.innerText = weekday[new Date(response.days[2].datetime).getDay()]
        dayFourDay.innerText = weekday[new Date(response.days[3].datetime).getDay()]
        dayFiveDay.innerText = weekday[new Date(response.days[4].datetime).getDay()]

        dayOneDate.innerText = `${month[new Date(response.days[0].datetime).getMonth()]} ${new Date(response.days[0].datetime).getDate()}`
        dayTwoDate.innerText = `${month[new Date(response.days[1].datetime).getMonth()]} ${new Date(response.days[1].datetime).getDate()}`
        dayThreeDate.innerText = `${month[new Date(response.days[2].datetime).getMonth()]} ${new Date(response.days[2].datetime).getDate()}`
        dayFourDate.innerText = `${month[new Date(response.days[3].datetime).getMonth()]} ${new Date(response.days[3].datetime).getDate()}`
        dayFiveDate.innerText = `${month[new Date(response.days[4].datetime).getMonth()]} ${new Date(response.days[4].datetime).getDate()}`

        dayOneContainer.classList.add(`${response.days[0].icon}`);
        dayTwoContainer.classList.add(`${response.days[1].icon}`);
        dayThreeContainer.classList.add(`${response.days[2].icon}`);
        dayFourContainer.classList.add(`${response.days[3].icon}`);
        dayFiveContainer.classList.add(`${response.days[4].icon}`);

        //Hourly
        hoursContainer.innerHTML = ""
        for (let i = 0; i < 24; i++) {
            hoursContainer.innerHTML += 
            `<div class="hours ${response.days[0].hours[i].icon}">
                <div class="hourly-temp">${Math.round(response.days[0].hours[i].temp)}</div>
                <div class="hour">${response.days[0].hours[i].datetime.slice(0, 5)}</div>
            </div>`
        }

        //Fifteen day forecast
        fifteenDayContainer.innerHTML = ""
        for (let i = 0; i < 15; i++) { 
            fifteenDayContainer.innerHTML += 
            `<div class="fifteen-day ${response.days[i].icon}">
                <div class="daily-temp">${Math.round(response.days[i].temp)}</div>
                <div class="day">${response.days[i].datetime.slice(5)}</div>
            </div>`
        }
    })

    speed.innerText = tempType == "Celsius" ? "KMH" : "MPH";
    amount.innerText = tempType == "Celsius" ? "MM" : "IN";
}

fetchApi()


const moonPhaseCheck = moonphase => {
    let phase = ""
    phase =
        moonphase == 0 ? "New Moon" :
        moonphase > 0 && moonphase < 0.25 ? "Waxing Crescent" :
        moonphase == 0.25 ? "First Quarter" :
        moonphase > 0.25 && moonphase < 0.5 ? "Waxing Crescent" :
        moonphase == 0.5 ? "Full Moon" :
        moonphase > 0.5 && moonphase < 0.75 ? "Waning Gibbous" :
        moonphase == 0.75 ? "Last Quarter" :
        "Waning Crescent";
    return phase
}

const windDirectionCheck = windDir => {
    let direction = "";
    direction = 
        windDir == 0 ? "N" :
        windDir > 0 && windDir <= 45 ? "NNE" :
        windDir == 45 ? "NE" :
        windDir > 45 && windDir <= 90 ? "ENE" :
        windDir == 90 ? "E" :
        windDir > 90 && windDir <= 135 ? "ESE" :
        windDir == 135 ? "SE" :
        windDir > 135 && windDir <= 180 ? "SSE" :
        windDir == 180 ? "S" :
        windDir > 180 && windDir <= 225 ? "SSW" :
        windDir == 225 ? "SW" :
        windDir > 225 && windDir <= 270 ? "WSW" :
        windDir == 270 ? "W" :
        windDir > 270 && windDir <= 315 ? "WNW" :
        windDir == 315 ? "NW" :
        windDir > 315 && windDir < 360 ? "NNW" :
        "N" 
    return direction;
};

const selectCelsius = () => {
    if (tempType != "Celsius") {
        tempType = "Celsius" 
        degCelBtn.classList.toggle("active-btn")
        farBtn.classList.toggle("active-btn")
        fetchApi()
    }   return
}

const selectFahren = () => {
    if (tempType != "Fahrenheit") {
        tempType = "Fahrenheit" 
        degCelBtn.classList.toggle("active-btn")
        farBtn.classList.toggle("active-btn")
        fetchApi()
    }   return
}

const selectToday = () => {
    if (daySelect != 0) {
        daySelect = 0 
        todayBtn.classList.toggle("active")
        todayBtn.classList.toggle("inactive")
        tomorrowBtn.classList.toggle("active")
        tomorrowBtn.classList.toggle("inactive")
        fetchApi()
    }   return
}

const selectTomorrow = () => {
    if (daySelect != 1) {
        daySelect = 1 
        todayBtn.classList.toggle("active")
        todayBtn.classList.toggle("inactive")
        tomorrowBtn.classList.toggle("active")
        tomorrowBtn.classList.toggle("inactive")
        fetchApi()
    }   return
}

const searchNewCity = () => {
    if (searchBar.value) {
        locationSearched = searchBar.value;
        searchBar.value = ""
        showHideSearch()
        fetchApi()
    }
}

const showHideSearch = () => {
    searchBar.classList.toggle("showSearch")
    searchBar.classList.toggle("hideSearch")
    searchBtn.classList.toggle("showSearch")
    searchBtn.classList.toggle("hideSearch")
    showHideBtn.classList.toggle("searching")
    degCelBtn.classList.toggle("hideSearch")
    farBtn.classList.toggle("hideSearch")
}