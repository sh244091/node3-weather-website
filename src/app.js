const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//setting the paths
const publicPathDir= path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setting the handle bar engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setting the static path directory
app.use(express.static(publicPathDir))

app.get('', (req, res)=> {
    res.render('index', {
        title : 'Weather    ',
        name: 'Lateef'
    })
})

app.get('/about', (req, res)=> {

    res.render ('about', {
        title: 'About',
        name : 'Lateef'

    })

})

app.get('/help', (req, res)=> {

    res.render('help', {

        title: 'Help',
        msg : 'This is some helpful text',
        name: 'Lateef'
    })

})

app.get('/weather',(req, res)=> {

    if(!req.query.address) {

        return res.send({

            error: 'You must provide an address'
        })
    }


    geocode (req.query.address, (error, {latitude, longitude , location} = {})=> {

        if(error) {

            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=> {

            if(error) {

                return res.send({error})
            }

            res.send ({

                forecast : forecastData,
                location,
                address: req.query.address

            })
        })
    })

})


app.get('/products', (req, res) => {

    if(!req.query.search) {

        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({

        products: []
    })
})


app.get('/help/*', (req, res)=> {

    res.render('404', {
        title: '404',
        errorMessage : 'Help Article not found',
        name: 'Lateef'

    })
})

app.get('*', (req, res)=> {

    res.render('404', {
        title: '404',
        errorMessage : 'Page not found',
        name: 'Lateef'


    })
})

app.listen(3000, ()=>{

    console.log('Server started successfully')
})