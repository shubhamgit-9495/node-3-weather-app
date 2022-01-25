const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode=require("./utils/geocode.js")
const weather=require("./utils/weather.js")

const app = express()

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../templates/views"))
hbs.registerPartials(path.join(__dirname,"../templates/partials"))

//Setup static directory to serve
app.use(express.static(path.join(__dirname,"../public")))


app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Shubham Jha"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About the Weather App",
        info: "This app was created by Shubham Jha during the node course on Udemy",
        name: "Shubham Jha"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help Me",
        info: "Help kro koi iski",
        name: "Shubham Jha"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please enter an address to search."
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        weather(latitude,longitude,place,(error,wdata)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                address: req.query.address,
                forecast: wdata
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render("error",{
        title:"404 Not Found",
        errorMsg:"Help article not found",
        name:"Shubham Jha"
    })
})

app.get('*',(req,res)=>{
    res.render("error",{
        title:"404 Not Found",
        errorMsg:"Page not found",
        name:"Shubham Jha"
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})