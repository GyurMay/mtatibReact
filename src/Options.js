// import { options } from "nodemon/lib/config";
import React from "react"
// import "./tibDB"
import {useState, useEffect} from "react"

const locationPermission = false;
let globalLat, globalLon;
const stopIds = [];
let mStation = {};
let currentStation = '';

/**
 * 
 * // locDBArr <- get this from the console log from where we get to know what name for locDb[name] went wrong
// collectorArr <- get this from network tab collector-otp... aka url is requested to https://collector-otp-prod.camsys-apps.com/schedule/MTASBWY/stopsForRoute?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP&&routeId=MTASBWY:${line}`
it = 0; v ='';
for(i in locDBArr){
    console.log(`"${collectorArr[it].stopName}": [${locDBArr[i]}]`, collectorArr[it].stopName, i);
    it++;
} //here confirm that the indexing order of these two arr are the same

it = 0; v ='';
for(i in locDBArr){
    v += `"${collectorArr[it].stopName}": [${locDBArr[i]}],\n`;
    it++;
}
 */

let disabled_ids = [];
export const back = () => {
    document.getElementById("back").style.display = 'none';
    console.log(currentStation)
    currentStation.style.display = 'none';
    let options = document.querySelector(".options").children;
    for(let i=0;i<options.length;i++)
        options[i].style.display = 'block';
    //document.querySelector('img[onclick="playnavigation()"]').style.display = '';
    //document.querySelector('img[onclick="playnavigation()"]').style.animation = '';
  
    while(disabled_ids.length != 0){
        document.getElementById(disabled_ids.pop()).style.display = "block";
    }
}
 function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
function GetClosestStation(props){
    const [allLocs, setAllLocs] = useState([]);
    const [allLines, setAllLines] = useState([]);
    const [allBusLocs, setAllBusLocs] = useState([]);
    // const [options_p_Arr, setOptions_p_Arr] = useState([]);
    
    let home_lat = 40.73671957818318, home_lon = -73.87569054132567;

    useEffect(() => {
        (async() => {

            let x = await fetch("https://gyurmay.github.io/mtatib/locDb2/allLocs.json");
            let allLocs1 = (await x.json());
            setAllLocs(allLocs1);

            x = await fetch("https://gyurmay.github.io/mtatib/locDb2/allLines.json");
            let allLines1 = (await x.json());
            setAllLines(allLines1);

            x = await fetch("https://gyurmay.github.io/mtatib/locDb2/allLocsBus.json");
            let allLocs2 = (await x.json());
            setAllBusLocs(allLocs2);
            
        })();
    }, []);

// useEffect(() => {
    let [lat, lon] = [40.6980331, -73.806328];
    // let [lat, lon] = [home_lat, home_lon]
    // let lat=40.6980331 lon=-73.806328;
    let myloc = [];
    myloc[0] = lat; console.log(lat);
    myloc[1] = lon;
    let num = allLocs; // store [lat,lon] for all given

    let d_arr = {}; // stationName/ p[id]
    let d_arr_cop = []; //distances
    let j;
    
    for(j=0;j<allLocs.length;j++){ //logging the distances of the stations with increment j for objects
        let distance = Math.sqrt((((num[j]["loc"][0] - myloc[0])*(num[j]["loc"][0] - myloc[0])) + (num[j]["loc"][1] - myloc[1])*(num[j]["loc"][1] - myloc[1])));
        console.log("from home to "+ num[j].name + ". distance: "+distance);
        d_arr[distance] = num[j].name; //input distance get the station Id
        d_arr_cop[j] = distance;
    }

    let num2 = allBusLocs;
    for(let k=0;k<allBusLocs.length;k++){
        for(j=0;j<allBusLocs[k].length;j++){ // logging the distances of the bus Stations with increment j for objects
            let distance = Math.sqrt((((num2[k][j]["lat"] - myloc[0])*(num2[k][j]["lat"] - myloc[0])) + (num2[k][j]["lon"] - myloc[1])*(num2[k][j]["lon"] - myloc[1])));
            console.log("from home to "+ num2[k][j].name + ". distance: "+distance);
            d_arr[distance] = num2[k][j].name; // input distance get the station Id
            d_arr_cop[j] = distance;
            mStation[num2[k][j].name] = num2[k][j].id;
        }
    }
    
 
    let options_p_Arr = [];
    // useEffect(() => { 
        console.log("Before sorting", d_arr_cop);
        d_arr_cop.sort((a,b) => a-b);
        d_arr_cop = [...new Set(d_arr_cop)];
        console.log("After insertion", d_arr_cop);
        // new Promise((resolve) => setTimeout(resolve, 1000));
        // }, []);


    // setTimeout(() => {
        // let it=0;
        // d_arr_cop.forEach(x => {
        let numOptions = 10; // how many stations stops do we want to show?
        for(let i=0;i<numOptions; i++){ 
            let x = d_arr_cop[i];  
            let name = d_arr[x];
            console.log("ballll",d_arr_cop)
            console.log("closest", d_arr[d_arr_cop[0]]);
            let line;
            // let line = (allLines.find(x => x.stopName === name) !== undefined ? 'UN' : allLines.find(x => x.stopName === name).routeId.slice(-1));
            let xaFound = false;
            for(let j=0;j<allLines.length;j++){
                x = allLines[j];
                let xa = x.find(y => y.stopName === name);
                x.forEach(y => { 
                    mStation[y.stopName] = y.stopId;
                })
                if(xa !== undefined && !xaFound){
                    line = xa.routeId.slice(-1);
                    xaFound = true;
                }
            }
            if(!xaFound){
                let a = allBusLocs;
                let lines = [];
                for(let k=0;k<a.length;k++){
                    let xa = a[k].findIndex(y => y.name === name);
                    console.log("xa", xa);
                    if(xa !== -1){
                        a[k][xa].routes.forEach(y => {
                            line = y.id.includes("NYCT") ? y.shortName : '';
                            if(line !== ''){
                                console.log("the lineName/busName found::", line);
                                lines.push(line);
                            }else{ console.log("bus isn't NYCT bus")}
                        });
                    }
                }
                line = lines.join(" | ");
            }

            // for(let j=0;j<num2.length;j++){
            //     x = allLines[j];
            //     let xa = x.find(y => y.stopName === name);
            //     x.forEach(y => { 
            //         mStation[y.stopName] = y.stopId; 
            //     })
                
            // }

            // console.log(JSON.stringify())
            let img;
            if(line.length > 1 || line === undefined){
                img = line+" | ";
            }else{
                img = (<img src={"https://new.mta.info/themes/custom/bootstrap_mta/images/icons/"+line+".svg"} style={{height:'1em', padding:'1px 0 2px 3px'}} />);
            }
            // img = (<img src={"https://new.mta.info/themes/custom/bootstrap_mta/images/icons/"+line+".svg"} style={{height:'1em', padding:'1px 0 2px 3px'}} />);
            options_p_Arr.push(
            <p id={name} style={{display:'flex', alignItems:'center'}} key={name} onClick={() => loadSchedulePage(mStation[name], name)}>
                {img}
                {name}
            </p>);
        };
        // }, []);
        return (<>{options_p_Arr}</>);
            // }, 1000); //wait one sec for sort() function to take place
        // })();
    // }, []);
    // }, []);
}

const tibetanName = (engName) => {
    return engName;
};
const schedulevisible = (stationName) => {
    let id = stationName;
    console.log("times is w/ id:" + id);
    let times = document.getElementById(id);
    currentStation = times;
    times.style.display = 'block';
    let options = document.querySelector(".options").children;
    for(let i=0;i<options.length;i++)
        options[i].style.display = 'none';
    document.getElementById("back").style.display = 'block';
    //document.querySelector('img[onclick="playnavigation()"]').style.display = 'none';
    // navigation.pause();
    // navigation.currentTime = 0;
}
const loadSchedulePage = (line, name) => {
    // const [jsonResp, setJsonResp] = useState([]); 
    console.log("mStation", mStation);
    let url = `https://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?stops=${line}&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE`;
    let jr = []; // jsonResponse

    (async () => {
        const resp = await fetch(url);
        const data = await resp.json();
        jr = data[0];
        // prompt("",JSON.stringify(jr));
        
        if(document.getElementById(name+'-time') != null) document.getElementById(name+'-time').remove(); //remove old -time if exist
        let stations = document.createElement('p'); //select divId(<p></p>) box
        stations.style.display = 'none';
        let stationName = document.createElement('div');
        stationName.innerHTML += '<b>'+name+'</b><br/><br/>';
        stations.append(stationName);
        stations.id = name+'-time';
        // stations.innerHTML += `<button id="go" style="position: relative;padding: 2em;font-size: 50%;left: 27%;background: teal;color: #fff; bottom: 1em;border: 5px solid white;border-radius: 7%;box-shadow: 4px 3px 0.5em black;">Go Here</button>`;
        //showTrainTimes();
        let table = document.createElement('table');
        table.id = "times";
        let shortNames = [], headsigns = [], arrivalTimes = [];
        
        for(let i=0; i<jr['groups'].length; i++){ //loop over each route (train Lines)
            shortNames[i] = jr['groups'][i]['route']['shortName'];
            headsigns[i] = jr['groups'][i]['headsign'];
            let numberOfTrains = jr['groups'][i]['times'].length;
            for(let j=0; j<numberOfTrains; j++){ //get arrival times rows
                let tr = document.createElement('tr');
                table.appendChild(tr);
                tr.innerHTML += (`<td><img src='https://new.mta.info/themes/custom/bootstrap_mta/images/icons/${shortNames[i]}.svg'></td>`);
                tr.innerHTML += '<td>'+tibetanName(headsigns[i])+'</td>'; //Print HeadSigns (which side is it going)
                let d = new Date(jr['groups'][i]['times'][j]['arrivalFmt']);
                let h = (d.getHours() > 12) ?  d.getHours() - 12 : d.getHours();
                if(h == 0) h = 12;
                let amPm = (d.getHours() > 12) ? 'PM' : 'AM';
                arrivalTimes[j] =  h+':'+d.getMinutes()+amPm;
                console.log("(new Date()).getHours(): " + (new Date()).getHours() + " > d.getHours(): " + d.getHours());
                tr.innerHTML += (`<td style='font-size:60%;'>${((new Date()).getHours() == (d.getHours())) ? (d.getMinutes() - (new Date()).getMinutes()) : ( (60 - (new Date()).getMinutes()) + d.getMinutes() ) } min</td>`);
            }

        document.body.appendChild(stations);
        }
        stations.appendChild(table);
        document.getElementById("load_icon").style.display = "none";
        schedulevisible(name+"-time");

    })();

    document.getElementById("load_icon").style.display = "block";
}

const LoadMainPage = props => {
    // document.querySelector('#loadLocDb').src = "https://gyurmay.github.io/mtatib/locDb2/" + (new URLSearchParams(window.location.search).get('line')) + ".js";
    const line = props.line;
    let url = `https://collector-otp-prod.camsys-apps.com/schedule/MTASBWY/stopsForRoute?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP&&routeId=MTASBWY:${line}`;
    
    const [jsonResp, setJsonResp] = useState([]);
    const [locDb, setLocDb] = useState([]);
    // const [lat, setLat] = useState();
    // const [lon, setLon] = useState();
    // const [mStation, setmStation] = useState({});

    const options_p_Arr = [];
    useEffect(() => {
        (async () => {
            let url2 = "https://gyurmay.github.io/mtatib/locDb2/" + (new URLSearchParams(document.location.search).get('line')) + ".json";
            // let url2 = "/R.json";
            const locResp = await fetch(url2);
            const locData = await locResp.json();
            setLocDb(locData);
            // document.write(JSON.stringify(locData))

            const resp = await fetch(url); //Whitehall here but in Loc2DB its "whitehall st - somthing".. so making a include instead
            const data = await resp.json();
            setJsonResp(data);

            setGeoLocationPermission();
        })();
    }, []);
    jsonResp.forEach(i => {
      let name = i.stopName;
      // setLat(locDb); 
      // setLon(locDb[name][1]);
      console.log(JSON.stringify(locDb))
    //   setmStation(arr => [...arr, ""]);
      mStation[name] = i["stopId"];
      console.log(`name no work for ${name}`)
      console.log(`Inserting ${name} with longitude: ${locDb[name][0]}`);
    //   if(name.includes("Center")) name.replace(/Center/g,"Ctr");
      options_p_Arr.push(<p id={name} lon={locDb[name][0]} lat={locDb[name][1]} key={name} onClick={() => loadSchedulePage(mStation[name], name)} >{name}</p>);
    });

    return (<><>{options_p_Arr}</></>);
};

const setGeoLocationPermission = () => {
    // navigator.geolocation.getCurrentPosition(position => {
    //     globalLat = position.coords.latitude;
    //     globalLon = position.coords.longitude;
    //     locationPermission = true;
    //     getClosestStation(globalLat, globalLon);
    //     let lenny = options[0].childElementCount;
    //     for(let incre=0; incre<lenny; incre++){
    //         options[0].appendChild(document.getElementById(d_arr[d_arr_cop[incre]]));
    //     }
    // });
};

const Options = (props) => {
    const urlParams = new URLSearchParams(window.location.search);
    let options = (
            <>
            <div className="options">
            <LoadMainPage line={urlParams.get('line')} />
            </div>
            </>
        );
    if(urlParams.get("selectLines") === "t"){
        options = (
            <div className="options">
                <GetClosestStation />
            </div>
        );
    }
    return options;
};

export default Options;