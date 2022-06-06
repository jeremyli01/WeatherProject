const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "bbf4a7fee23195eca755a9ddec814c2f";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) { // use on method to send back data
      const weatherData = JSON.parse(data); //convert hexadecimal code to a js object
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is: " + temp + " degrees Celcius.</h1>"); //only one send in a get method
      res.write("<img src=" + imageURL + ">");
    });
  });
});



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
