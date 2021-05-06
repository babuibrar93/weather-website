const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../src/utils/geocode')
const weatherApi = require('../src/utils/weatherApi')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Babu ibrar',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Babu ibrar',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Babu ibrar',
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send ({
            error: 'You must provide address for getting weather result'
    })        
}
   
    geocode(req.query.address, (error, { latitude,longitude,location } = { }) => { // destruction of data
        if(error) {
            return res.send({error}) // function stops here 
        }
        weatherApi(latitude, longitude, (error, forcastData) => {
            if(error) {
                return res.send({error}) // function stops here 
            }
            const forcast = forcastData
            res.send({
                forecast: forcast,
                location: location,
                address: req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Babu ibrar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Babu ibrar',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})