const inputSearchField = document.querySelector("#inputSearchField");
const buttonSearch = document.querySelector("#buttonSearch");
const main = document.querySelector("main");


async function fetchWeather(location, unitGroup = "metric") {
    if (!location) return;

    const key = "VEKGK4ZAPZSEW872SDTYJN7EY";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next9days?unitGroup=${unitGroup}&key=${key}`;

    try {
        const response = await fetch(url, { mode: "cors" });
        const weatherData = await response.json();
        return weatherData.days;
    } catch (error) {
        showError("Could not fetch weather data. Please try again.");
    }
}

function getDayName(dateString) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
}

function renderTableData(days, location) {
    if (!days || !Array.isArray(days)) {
        showError("No weather data available.");
        return;
    }

    main.innerHTML = "";

    const table = createTable();
    const tableHeading = document.createElement("h2");
    tableHeading.className = "textGrey";
    tableHeading.textContent = `Next 10 days in ${location}`;

    days.forEach(day => {
        const tableRow = document.createElement("tr");

        const tableDataDay = document.createElement("td");
        tableDataDay.textContent = getDayName(day.datetime);

        const tableDataCondition = document.createElement("td");
        tableDataCondition.textContent = day.conditions;

        const tableDataTemp = document.createElement("td");
        tableDataTemp.textContent = `${Math.round(day.temp)}°C`;

        const tableDataPrecip = document.createElement("td");
        tableDataPrecip.textContent = `${Math.round(day.precip)}%`;

        const tableDataWind = document.createElement("td");
        tableDataWind.textContent = `${Math.round(day.windspeed)} m/s`;

        tableRow.appendChild(tableDataDay);
        tableRow.appendChild(tableDataCondition);
        tableRow.appendChild(tableDataTemp);
        tableRow.appendChild(tableDataPrecip);
        tableRow.appendChild(tableDataWind);

        table.appendChild(tableRow);
    });

    main.appendChild(tableHeading);
    main.appendChild(table);
}

function createTable() {
    const table = document.createElement("table");
    const tableHeader = document.createElement("tr");
    tableHeader.className = "tableHead";

    const headers = [
        { id: "thDay", text: "Day" },
        { id: "thCondition", text: "Condition" },
        { id: "thTemp", text: "Temperature" },
        { id: "thPrecip", text: "Precipitation" },
        { id: "thWind", text: "Wind" }
    ];

    headers.forEach(header => {
        const th = document.createElement("th");
        th.id = header.id;
        th.textContent = header.text;
        tableHeader.appendChild(th);
    });

    table.appendChild(tableHeader);
    return table;
}

function showError(message) {
    main.innerHTML = `<p class="textDanger">${message}</p>`;
}

function setupEventListeners(){
    buttonSearch.addEventListener("click", () => {
    const location = inputSearchField.value.trim();
    if (!location) return;

    fetchWeather(location).then(days => {
        renderTableData(days, location);
    });

    inputSearchField.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    const defaultLocation = "Stockholm";
    fetchWeather(defaultLocation).then(days => {
        renderTableData(days, defaultLocation);
    });
});
}


setupEventListeners();