const request = require("request")

const forcast = (lat, lon, callback) => {

    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&%20exclude=hourly,daily&appid=d637e494b01b39079ab0404dc4a475cf&units=metric"

    request({ url, json: true }, (error, { body }) => {

        // console.log(error)
        if (error) {
            callback("Unable to access the weather services ...!")
        } else if (body.message) {
            callback(chalk.red(body.cod) + " " + body.message)
        } else {
            callback(undefined, {
                // dayTemp: body.daily[0].temp.day,
                rain: body.daily[0].rain,
                // weather: body.daily[0].weather[0].description

                dayTemp: body.current.temp,
                weather: body.current.weather[0].description,
                pressure: body.current.pressure,
                humidity: body.current.humidity

            })
        }
    })


}
module.exports = forcast