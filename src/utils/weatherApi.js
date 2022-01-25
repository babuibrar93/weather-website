const request = require("request");

const weatherApi = (latitude, longitude, callback) => {
  const darkskyURL =
    "https://api.darksky.net/forecast/b3b186b490908e1faef41d4b072e8709/" +
    latitude +
    "," +
    longitude +
    "?units=si&lang=en";

  request({ url: darkskyURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location! Try another one!", undefined);
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " It is currently " +
          response.body.currently.temperature +
          " degree outside. The high temperature today is " +
          response.body.daily.data[0].temperatureHigh +
          " degree, with the low of " +
          response.body.daily.data[0].temperatureLow +
          " degree. There is " +
          response.body.currently.precipProbability +
          "% chance of rain"
      );
    }
  });
};

module.exports = weatherApi;
