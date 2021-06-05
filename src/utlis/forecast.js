const request = require("request");

const foreCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=37de05270c7a74162620c89966ad7007&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Error Occurs!", undefined);
    } else if (body.error === 0) {
      callback("Not Unable to find Location", undefined);
    } else {
      callback(
        undefined,
        `It's mostly ${body.current.weather_descriptions}. Currenty tempreture is ${body.current.temperature} degree.There is ${body.current.precip} of rain`
      );
    }
  });
};

module.exports = foreCast;
