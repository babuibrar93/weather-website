const request = require('request')

// Weather API Request

// const darkskyURL = 'https://api.darksky.net/forecast/b3b186b490908e1faef41d4b072e8709/37.8267,-122.4233?units=si&lang=en'

// request( {url: darkskyURL, json: true}, (error, responce) => {
//     if(error) { // No internet connection error
//         console.log('Unable to connect to weather services!')
//     } else if(responce.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(responce.body.daily.data[0].summary  + ' It is currently ' + responce.body.currently.temperature + ' degree outside')
//     }
// } )

const weatherApi = (latitude, longitude, callback) => {
    const darkskyURL = 'https://api.darksky.net/forecast/b3b186b490908e1faef41d4b072e8709/' + latitude + ',' + longitude + '?units=si&lang=en'

    request( {url: darkskyURL, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(response.body.error) {
            callback('Unable to find location! Try another one!', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary  + ' It is currently ' + response.body.currently.temperature + ' degree outside')
        }
    } )
}

module.exports = weatherApi