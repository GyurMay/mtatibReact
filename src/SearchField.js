// import React from "react";

window.onload = () => {
document.querySelector("#searchField").onkeydown = () => {
    filter();
};

const filter = () => {
    console.log('filter clicked');
    let visibleStation = document.getElementsByClassName('options')[0].childElementCount;
    let search = document.querySelector("#searchField").value;
    let match ='';
    for(let i=0;i<visibleStation;i++){ //goes through options class to hide all the options/visible stations
    if(document.getElementsByClassName('options')[0].children[i].id.toLowerCase().split(search.toLowerCase()).length >= 2){
        match = document.getElementsByClassName('options')[0].children[i].id;
        console.log('Results found: ' + match);
        document.getElementById(match).style.display = 'block';
    }else{
        document.getElementsByClassName('options')[0].children[i].style.display = 'none';
    }
    }
    if(match === ''){
        console.log('Nothing found bih');
        document.getElementById('noresultsfound').style.display = 'block';
    }   
}
};

export default function SearchField(){
return (
    <input id="searchField" placeholder="Search stations" style={{fontSize:'100%', width:'80%'}} type="text" />
);
};