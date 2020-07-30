const request = require("request")
const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?limit=2&access_token=pk.eyJ1IjoibWFsaXN1bWl0ODYxNiIsImEiOiJja2QxeGNuZmMxN3ZmMnFwdnRyMzl5NzMyIn0.-KP7S3PNguOsf9g1ER8SIA"


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to access the weather services ...!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find the Search results", undefined)
        } else {
            callback(undefined, {
                lon: body.features[0].center[0],
                lat: body.features[0].center[1],
                city: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode