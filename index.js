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

let tempType = "Celsius";
let daySelect = 0;

const apiLink = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const locationSearched = 'johannesburg'
const key = 'P5VJ3EUHTKFRAKTQPLXYM42ZE'

const fetchApi = () => {
    
    const currentLink = `${apiLink}${locationSearched}?unitGroup=${tempType == "Celsius" ? "metric" : "us"}&key=${key}&contentType=json`

    fetch(currentLink)

    .then(function (response) {
        return response.json();
    })

    .then(function (response) {
        locationName.innerText = response.address;
        timeNow.innerText = response.currentConditions.datetime;
        currentConditions.innerText = response.currentConditions.conditions;
        currentLow.innerText = Math.round(response.days[daySelect].tempmin);
        currentHigh.innerText = Math.round(response.days[daySelect].tempmax);
        currentPrec.innerText = Math.round(response.days[daySelect].precip)
        currentSunrise.innerText = response.days[daySelect].sunrise;
        currentSunset.innerText = response.days[daySelect].sunset;
        currentMoonphase.innerText = moonPhaseCheck(response.days[daySelect].moonphase)
        currentWind.innerHTML = `${Math.round(response.days[daySelect].windspeed)}<span id="direction">${windDirectionCheck(response.days[daySelect].winddir)}</span>`
        warnings.innerText = response.alerts.length > 0 ? response.alerts : "None";
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