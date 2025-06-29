const metricUnitParameter = "metric";
const usUnitParameter = "us";

// I set the unit group to default to "metric"
async function fetchWeather(location, unitGroup="metric"){
    
    const key = `VEKGK4ZAPZSEW872SDTYJN7EY`;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${key}`

    try{
        let response = await fetch(url, {mode: 'cors',});
        const weatherData = response.json();

        weatherData.then(weatherData =>{
            const days = weatherData.days;
            
            days.forEach(day => {
                console.log(day.datetime);
                console.log(day.temp);
                console.log(day.feelslike);
                console.log(day.windspeed);

            });
        })


    } catch(error){
        console.log(`Error: ${error}`);
    }
    
}

fetchWeather("stockholmn");