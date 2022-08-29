const express = require("express")
const https = require('node:https')
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html")
})

app.post("/", function(req,res){
  // console.log(req.body.cityName)
  const query = req.body.cityName
  const apikey = "57fde9e3d15c9bfaf55f2e12cb7f2d96"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apikey + "&units=" + units
  https.get(url, function(response){
    console.log(response.statusCode)
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      //console.log(weatherData)
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      const description = weatherData.weather[0].description
      res.write("<p>The Weather is currently " + description + "</p>")
      res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius</h1>")
      res.write("<img src=" + imageURL +">")
      res.send()
      // console.log(description)
      // console.log(temp)
      // const object = {
      //   name: "David",
      //   favouriteFood: "Ramen"
      // }
      // console.log(JSON.stringify(object))
    })
  })
  // only one send
  // res.send("Server is up and running")
})










app.listen(3000, function(){
  console.log("Server running on port 3000")
})
