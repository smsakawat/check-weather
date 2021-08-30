// get city Name

const getValue = () => {
    // clean UI
    document.getElementById('error-container').innerHTML = '';

    document.getElementById('weather-container').innerHTML = '';
    // document.getElementById('spinner').innerHTML = '';

    // get city name
    const cityName = document.getElementById('input-field').value;
    if (cityName.length > 0) {
        // turn on spinner
        document.getElementById('spinner').classList.remove('d-none');
        displayWeather(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2a67c3797591a5470e6cb9ae433854e7`)
    } else {
        //    show error message
        document.getElementById('error-message').innerHTML = '';
        const showError = document.getElementById('error-message');
        showError.innerHTML = `<div class="bg-danger bg-danger-gradient m-5  p-3 text-center rounded fw-lighter">
    <p>Please enter a city name</p></div>`;

    }

    document.getElementById('input-field').value = '';
}


// load data from server
const loadedData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    //   akhen catch use korbo kivabe
    return data;

}

// dispaly the updated weather of given city 
const displayWeather = url => {
    loadedData(url).then(data => {
        // turn off spinner
        document.getElementById('error-message').innerHTML = '';
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('weather-container').innerHTML = '';
        const weatherDiv = document.getElementById('weather-container');
        const celcius = ((data.main.temp) - 273.15).toFixed(2);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="" />
        <h1>${data.name}</h1>
        <h3><span>${celcius}</span>&deg;C</h3>
        <h1 class="lead">${data.weather[0].main}</h1>`;
        weatherDiv.appendChild(newDiv);
    })
        .catch(err => {
            handleError();

        })

}
// handle errors
function handleError() {
    const cityName = document.getElementById('input-field').value;
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = ` <div class="card m-auto p-5 bg-danger bg-danger-gradient" style="width: 18rem">
          <h5 class="card-title">Dear User,</h5>
          <p class="card-text">
          Your search --<b>${cityName}</b>-- did not match any of our city's. Please enter a
            correct city.
          </p>
        </div>`;
}

