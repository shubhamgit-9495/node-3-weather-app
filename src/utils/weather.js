const request=require("request")
const weather = (lat,lon,place,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d462fb3cf98836ab8aa684a835b2205e&query='+lat+','+lon+'&units=f'
    request({url:url, json:true},(error,response,body)=>{
        if(error){
            callback('Unable to connect to weather service.',undefined);
        }else if(body.error){
            callback(body.error.info,undefined);
        }else{
            callback(undefined,"The temperature of "+place+" is "+body.current.temperature+" degrees farenheit and there is a "+parseFloat(body.current.precip)*100+"% chance of precipitation.");
        }
    })
}
module.exports=weather