import React from "react";
import TopBar from "./components/TopBar"
import SearchField from "./SearchField"
import TrainLines from "./TrainLines"
import Options from "./Options"
import "./App.css"


const App = () => {
  if(new URLSearchParams(document.location.search).get('line') === null && (new URLSearchParams(document.location.search)).get('selectLines') === null){
    document.location = document.location.origin + '?line=R';
  }
  return (
    <div className="App">
      <TopBar />
      <SearchField />
      <TrainLines />
      <Options />
    </div>
  );
}

export default App;