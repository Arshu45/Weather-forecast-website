const request = require("request");

const weatherForecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c1e3830d6ed74e4f60d60e297b772e60&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to Weather Services`, undefined);
    } else if (body.error) {
      callback(`Unable to find Location`, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, and it feels like ${body.current.feelslike}.
        The wind speed is currently ${body.current.wind_speed} km/h .
        There is a ${body.current.precip}% chance of rain.
        The UV index is currently ${body.current.uv_index}.
        The Cloud Cover is ${body.current.cloudcover}%.`
      );
    }
  });
};

module.exports = weatherForecast;
