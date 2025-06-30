const metricUnitParameter = "metric";
const usUnitParameter = "us";
const inputSearchField = document.querySelector("#inputSearchField");
const buttonSearch = document.querySelector("#buttonSearch");
const locationElement = document.querySelector("#locationEl");



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




function renderWeatherData(days, location){
    const main = document.querySelector("main");
    const table = createTable();


    // The array with all the days passed as an argument on function call
    days.forEach(day => {
        const tableRow = document.createElement("tr");
        
        const tableDataDay = document.createElement("td");
        tableDataDay.textContent = getDayName(day.datetime);
        
        const tableDataTemp = document.createElement("td");
        tableDataTemp.textContent = `${day.temp}°C`;
        
        const tableDataPrecip = document.createElement("td");
        tableDataPrecip.textContent = `${day.precip}%`;
        
        const tableDataWind = document.createElement("td");
        tableDataWind.textContent = `${day.windspeed} m/s`;

        locationElement.textContent = location
        
        tableRow.appendChild(tableDataDay);
        tableRow.appendChild(tableDataTemp);
        tableRow.appendChild(tableDataPrecip);
        tableRow.appendChild(tableDataWind);
        
        
        table.appendChild(tableRow);
    });
    locationElement.textContent = location;
    
    
    main.appendChild(table);
}

function createTable(){
    const table = document.createElement("table");

    const tableHeader = document.createElement("tr");
    tableHeader.setAttribute("class", "tableHead");
    
    const tableHeadDay = document.createElement("th");
    tableHeadDay.setAttribute("id", "thDay");
    tableHeadDay.textContent = "Day"
    
    const tableHeadTemp = document.createElement("th");
    tableHeadTemp.setAttribute("id", "thTemp");
    tableHeadTemp.textContent = "Temperature"
    
    const tableHeadPrecip = document.createElement("th");
    tableHeadPrecip.setAttribute("id", "thPrecip");
    tableHeadPrecip.textContent = "Precipitation"
    
    const tableHeadWind = document.createElement("th");
    tableHeadWind.setAttribute("id", "thWind");
    tableHeadWind.textContent = "Wind"

    tableHeader.appendChild(tableHeadDay);
    tableHeader.appendChild(tableHeadTemp);
    tableHeader.appendChild(tableHeadPrecip);
    tableHeader.appendChild(tableHeadWind);
    table.appendChild(tableHeader);

    return table;


}


buttonSearch.addEventListener("click", () => {
    const location = inputSearchField.value;
    

    fetchWeather(location).then(days => {
          
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

    inputSearchField.value = "";

    renderWeatherData(days, location);
});
})
