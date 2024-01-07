import { useState } from "react"
import WebMap from "../components/WebMap"

function App() {

  const [mapSelection, setMapSelection] = useState(0);

  const handleMapChange = (event) => {
    setMapSelection(event.target.value);
    console.log(event.target.value)
    console.log(mapSelection)
  }

  return (
    <>
      <h1>Avon and Somerset Police Data</h1>
      <WebMap mapSelection={mapSelection}/>
      <div>
        <h2>UI</h2>
        <select onChange={handleMapChange}>
          <option value="0">Avon and Somerset Map</option>
          <option value="1">Crime and Poverty UK</option>
        </select>
      </div>
      
    </>
  )
}

export default App;
