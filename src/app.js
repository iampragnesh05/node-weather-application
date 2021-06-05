const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const foreCast = require("./utlis/forecast");
const geoCode = require("./utlis/geocode");
const { error } = require("console");
const port = process.env.PORT || 3000; 

// Setting middleware
const publicDirectoryPath = path.join(__dirname, "/public");
app.use(express.static(publicDirectoryPath));
const viewPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Home Page",
    name: "Pragnesh Shrimal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather About Page",
    name: "Pragnesh Shrimal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather Help Page",
    description:
      "Type in your desired location on the Weather page and click Search.",
    name: "Pragnesh Shrimal",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "No Place found.",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      foreCast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          foreCast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// app.get("/products", (req, res) => {
//     if(!req.query.place){
//         res.send({
//             error: 'There is error occurs!'
//         })
//     }
//     console.log(req.query.place)
//     res.send({
//         products: []
//     })
// })

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Pragnesh Shrimal",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
