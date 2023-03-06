export const weatherService = {
    getWeather
}

function getWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=ff9107689551acc4da747779b7fb17fa&units=metric`
    return axios.get(url)
        .then(url => url.data)
        .then(res => {
            console.log('res:', res)
            return {
                temp: res.main.temp,
                feelsLike: res.main.feels_like,
                humidity: res.main.humidity,
                description: res.weather[0].description,
                name: res.name
            }
         })
}