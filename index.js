async function weatherDetails() {
    const city = document.getElementById('city').value.trim();
    const weatherDiv = document.getElementById('weather');
    const loading = document.getElementById('loading');

    if (!city) {
        weatherDiv.innerHTML = 'Please enter a city name';
        return;
    }

    loading.style.display = 'block';
    weatherDiv.innerHTML = '';

    const apiUrl = `https://wttr.in/${city}?format=j1`;

    try {
        const response = await fetch(apiUrl);
       
        
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        console.log(data);
        loading.style.display = 'none';

        // Weather condition icons mapping
        const weatherIcons = {
            'Clear': 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png', // Sunny
            'Clouds': 'https://cdn-icons-png.flaticon.com/512/414/414927.png', // Cloudy
            'Rain': 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png', // Rainy
            'Snow': 'https://cdn-icons-png.flaticon.com/512/2315/2315377.png', // Snowy
            'Thunderstorm': 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png', // Storm
            'Mist': 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png', // Misty
            'Drizzle': 'https://cdn-icons-png.flaticon.com/512/3075/3075858.png' // Drizzle
        };

        const current = data.current_condition[0];
        const location = data.nearest_area[0].areaName[0].value;               
        const iconUrl = weatherIcons['Clouds']; // Default to clouds

        document.getElementById('weather').innerHTML = `
            <h2>${location}</h2>
          <p>Temperature: ${current.FeelsLikeC}°C</p>
          <p>Weather: ${current.weatherDesc[0].value}</p>
          <p>Humidity: ${current.humidity}%</p>
            <img src="${iconUrl}" alt="image">
        `;
    } catch (error) {
        loading.style.display = 'none';
        weatherDiv.innerHTML = error.message;
    }
}