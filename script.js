async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "510f1140b4337fa7d1b68b73111c88b9"; // Replace with your real API key
  const weatherBox = document.getElementById("weatherResult");

  if (!city) {
    weatherBox.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
    return;
  }

  weatherBox.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>🌤️ Condition: ${data.weather[0].main}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
    weatherBox.innerHTML = html;
  } catch (err) {
    weatherBox.innerHTML = `<p style='color:red;'>${err.message}</p>`;
  }
}
