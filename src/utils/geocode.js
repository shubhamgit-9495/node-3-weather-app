const request=require("request")
const geocode = (address,callback)=>{
    const mapUrl='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZnVua3lsaXR0bGVnZW5pdXM5NCIsImEiOiJja3lwbjB2Y2UwYnR4MzJtMWlkOHp6d2Z4In0.YimYvkxf_qjEho4Mr2J3Ww&limit=1';
    request({url:mapUrl,json:true},(error,response,body)=>{
        if(error){
            callback("Unable to connect to map service",undefined);
        }else if(body.features.length===0){
            callback("Place not found",undefined);
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place:body.features[0].place_name
            });
        }
    })
}
module.exports=geocode