const metricUnitParameter = "metric";
const usUnitParameter = "us";

// I set the unit group to default to "metric"
async function fetchWeather(location, unitGroup="metric"){
    
    if(!location){
        return;
    }
    
    location = location.trim();
    const key = `VEKGK4ZAPZSEW872SDTYJN7EY`;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${key}`

    try {
        let response = await fetch(url, {mode: 'cors',});
        const weatherData = await response.json();
        const days = weatherData.days;

        return days;

    } catch(error){
        console.error(`Error: ${error}`);
    }
    
}

function getDayName(dateString){
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    
    // getDay() returns a number between 0-6, with that I access the correct day from the daysOfWeek array
    return daysOfWeek[date.getDay()];
}


fetchWeather("london").then(days => {
          
    days.forEach(day => {
        console.log
        (
        // Name of the current day
        ` ${getDayName(day.datetime)} 
         \nTemp: ${day.temp}°C
         \nPrecipitation: ${day.precip}%
         \nWind Speed:${day.windspeed} m/s
         ` 

    );

    });
})