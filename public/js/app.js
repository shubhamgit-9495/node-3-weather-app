console.log("App js loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value
    console.log("Fetching weather for ",location);
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                document.getElementById("error").innerHTML=data.error
                document.getElementById("data").innerHTML=""
            }else{
                document.getElementById("data").innerHTML=data.forecast
                document.getElementById("error").innerHTML=""
            }
        })
    })
})