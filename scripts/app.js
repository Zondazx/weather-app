const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUserInterface = (data) => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    /*
    * Destructure properties:
    * data[0] = cityDetails;
    * data[1] = weather; 
    */
    const { cityDetails, weather } = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSource);

    // true => day, false => night.
    const timeSource = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSource);

    if (card.classList.contains("d-none")) card.classList.remove("d-none");
};

cityForm.addEventListener("submit", event => {
    event.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
        .then(data => updateUserInterface(data))
        .catch(error => console.log(error));

    localStorage.setItem("city", city);
});

/*
* Checks if there's an item in the local storage,
* if it's true, a calls is made to updateCity
* to retrieve the previous item (even if the user relaods the page).
*/
if (localStorage.getItem("city")) {
    forecast.updateCity(localStorage.getItem("city"))
        .then(data => updateUserInterface(data))
        .catch(error => console.log(error));
}