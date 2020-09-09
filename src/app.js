const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forcast = require("./utils/forcast")

const express = require("express")

const app = express()
const port = process.env.PORT || 3000

//setting the path to the express
const publicPath = path.join(__dirname, "../public")
//set the custom path to view directory ..
const viewPath = path.join(__dirname, "../templates/views")

const partialPath = path.join(__dirname, "../templates/partials")

//setup the handelbars engine and views location
app.set('view engine', 'hbs')
//view  engine find that after
app.set("views", viewPath)
hbs.registerPartials(partialPath)


//setup the static files
app.use(express.static(publicPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Sumit Mali"
    })
})



app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Sumit Mali"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helptext: "This is some helpfull text",
        title: "Help",
        name: "Sumit Mali"


    })
})
app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({ error: "Address must be provided..!" })
    }
    // console.log(req.query.search)
    // res.send({ product: [] })


    // res.send({
    //     forcast: "50 degrees",
    //     loacation: "Giradgaon",
    //     address: req.query.address
    // })
    geocode(req.query.address, (error, { lat, lon, city } = {}) => {
        if (error !== undefined) {
            return res.send({
                error: "Unable to connect location..!"
            })
        } else {
            // console.log(data)
            forcast(lat, lon, (error, { dayTemp, rain, weather, humidity, pressure }) => {
                if (error !== undefined) {
                    return res.send({
                        error: "Unable to connect location..!"
                    })
                }
                res.send({
                    Location: city,
                    Day_Temperature: dayTemp,
                    Rain_Probability: rain,
                    Sky: weather,
                    humidity: humidity,
                    Pressure: pressure + " hPa"
                })

            })
        }
    })
})





//always on the bottom..
app.get("/help/*", (req, res) => {
    res.render("404",

        {
            title: "404",
            name: "Sumit Mali",
            errorMsg: "help article not found..."
        }
    )
})


app.get("*", (req, res) => {
    res.render("404",

        {
            title: "404",
            name: "Sumit Mali",
            errorMsg: "Error 404 page"
        }
    )
})


app.listen(port, () => {
    console.log("server is running on the port " + port) 
})
