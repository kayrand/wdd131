const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

const temperature = 8;
const windSpeed = 12;

function calculateWindChill(temp, speed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1) + " °C";
}

const windChillElement = document.getElementById("windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.innerHTML = calculateWindChill(temperature, windSpeed);
} else {
    windChillElement.innerHTML = "N/A";
}