const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup HandleBars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to  serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    quote: "Use this site to get the Weather data for any given location!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    quote: "Emotions is everything",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    quote: "Helping others is necessary",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the address to get the Information!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, Location } = {}) => {
      if (error) {
        return res.send({
          error: `An error Occurred ${error}`,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: `Error ${error}`,
          });
        }

        res.send({
          forecast: forecastData,
          location: Location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide as search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "404",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404Page", {
    title: "404",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is Up and Running on Port 3000");
});
