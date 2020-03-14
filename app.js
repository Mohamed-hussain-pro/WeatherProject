const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
app.post("/", function(req,res){
    
     
    const query = req.body.cityName;
    const unit = "metric";
    const key = "c43d0c0dde4402638f75c9de3dac1b1c";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&APPID="+ key +"&units="+ unit +"&02d@2x.png"
    
    https.get(url, function(response){
        
    console.log(response.statusCode);
        
    response.on("data", function(data){
        const WeatherData = JSON.parse(data)
        const temp = WeatherData.main.temp
        const discription = WeatherData.weather[0].description
        const icon = WeatherData.weather[0].icon
        const url_icon = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        console.log(url_icon);
        res.write("<h1>The temperature in " + query +" is : " + temp + " degrees Celcius. <h1/>");
        res.write("<h2>The weather discription is :  " + discription + "<h2/>");
        res.write("<img src=" + url_icon + ">");
        res.send();
                
    })    
        
})
    
 
    
})    
  
})




app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})
