const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/82a16696acfa96427b68bd1a46ff9a71/'+latitude+','+longitude+'?units=si'

    request({url, json : true}, (error, {body})=> {

        if(error){

            callback('Unable to connect to the weather service', undefined)
        }
        else if(body.error) {

            callback('Unable to find the weather condition', undefined)
        }
        else {


            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature +' degrees out.'+ 'There is '+body.currently.precipProbability+'% chance of rain')

                

        }
    })
}


module.exports = forecast

