//Some Global Variables to Hold Info for Later

// //Constructors for API URL Request. We'll use these later
const baseURL = "https://api.openaq.org/v1/cities?limit=800&country=US";
//const films = "/films";

const fullURL = baseURL;

let i = 0;
let j = 0;
let num = 0;
let AqValue = 0;
let cities = document.getElementById('cities')

//Pull in our HTML elements so we can talk to them using JS
let title = document.getElementById("title");
let description = document.getElementById("description");

const giveTitle = () => {
   let listOfCities = "List of Cities";
   let node=document.createElement("p");
   let textnode=document.createTextNode(listOfCities);
          node.appendChild(textnode);
          document.getElementById("listOfCity").appendChild(node); 
}

const getCity = () => {
  fetch(fullURL)
    .then( response => {
      return response.json()
    })
    .then( json => {
      json.meta.limit=200;
      var nameValue = document.getElementById("country").value;
    for (j=0;j<10;j++){
          num = Math.floor(Math.random()*700);
          let firstname = json.results[num].city;
          let node=document.createElement("li");
          let textnode=document.createTextNode(firstname);
          node.appendChild(textnode);
          document.getElementById("cities").appendChild(node); 
          
      }
    })
  .catch(err => console.log(err))  
 
}
const apiCall = () => {
  console.log("fetching...")
  fetch(fullURL)
    .then( response => {
      console.log("the response is", response)
    //  document.getElementsByTagName('meta').length = 200;
   //  console.log(document.getElementsByTagName('meta').length);
      return response.json()
    })
    .then( json => {
      console.log(json.meta);
      json.meta.limit=200;
      console.log(json.results)
      var nameValue = document.getElementById("country").value;
      console.log(nameValue);
//    for (j=0;j<10;j++){
//          city = Math.random()*700;
//          let firstname = json.results[j].city;
//          let node=document.createElement("li");
//          let textnode=document.createTextNode(firstname);
//          node.appendChild(textnode);
//          document.getElementById("cities").appendChild(node); 
//          
//      }
      for (i=0; i<767; i++){
          if (json.results[i].city == nameValue){
              AqValue = parseInt(json.results[i].count)/10000;
              AqValue = Math.ceil(AqValue)
              console.log(AqValue);
          }
      }
     d3.select('#graph').append('svg')
    .attr('width', 400)
    .attr('height', 400)
    .style('background', 'white')
  .append('circle')
    .attr('cx',200)
    .attr('cy',200)
    .attr('r', AqValue*4)
    .style('fill','grey')
    .style('fill-opacity', AqValue/20)
    })
  .catch(err => console.log(err))
    
 
}

document.getElementById("getCity").addEventListener("click", getCity);
document.getElementById("getCity").addEventListener("click", giveTitle);
document.getElementById("fetchButton").addEventListener("click", apiCall);


var bardata = [20, 30, 45, 15];
var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;



