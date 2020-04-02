// 50 request to the API per day (deleting and adding again the app resets it).
class Forecast {
    constructor() {
        this.apiKey = "h8Cc9z2FhJGZnyxzlJ2s6C3lzTV6VvVx";
        this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getCurrentConditions(cityDetails.Key);
        return {
            cityDetails,
            weather
        };
    }
    async getCity(city) {
        const query = `?apikey=${this.apiKey}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    }
    async getCurrentConditions(cityID) {
        const query = `${cityID}?apikey=${this.apiKey}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }
}

// getCity("zulia").then(cityData => {
//     return getCurrentConditions(cityData.Key);
// }).then(conditionData => {
//     console.log(conditionData);
// }).catch(error => console.log(error));