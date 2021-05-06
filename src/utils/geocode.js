const request = require('request')

// Geocoding Request
// Address -> longitude/latitude -> Weather

// const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYmFidWlicmFyIiwiYSI6ImNrbzdhZDEwOTA1bDAydXMyNWpmamw0MDIifQ.n_kHxJvrOTeMazJwcEUFJg&limit=1'

// request( {url: mapboxURL, json: true}, (error, responce) => {
//     if(error) { // No internet connection error
//         console.log('Unable to connect to location services!')
//     } else if(responce.body.features.length === 0) {
//         console.log('Sorry! No match found!')
//     } else {
//         const longitude = responce.body.features[0].center[0]
//         const latitude = responce.body.features[0].center[1]
//         console.log(longitude, latitude)
//     }
// } )

const geocode = (address, callback) => {
    const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFidWlicmFyIiwiYSI6ImNrbzdhZDEwOTA1bDAydXMyNWpmamw0MDIifQ.n_kHxJvrOTeMazJwcEUFJg&limit=1'

    request( {url: mapboxURL, json: true}, (error, responce) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(responce.body.features.length === 0) {
            callback('Sorry! No match found!', undefined)
        } else {
            callback(undefined, {
                longitude: responce.body.features[0].center[0],
                latitude: responce.body.features[0].center[1],
                location: responce.body.features[0].place_name
            })
        }
    } ) 
}

module.exports = geocode