import { useState } from "react"
import WebMap from "../components/WebMap"

function App() {

  const [mapSelection, setMapSelection] = useState(1);

  const handleMapChange = (event) => {
    setMapSelection(event.target.value);
    console.log(event.target.value)
    console.log(mapSelection)
  }

  return (
    <>
      {/* These ternaries use strictequal but not deepstrictequal - doesn't work otherwise ?? */}
      {mapSelection == null && <h1>ArcGIS Demo Application</h1>}
      {mapSelection == 0 && <h1>Avon and Somerset Police Data</h1>}
      {mapSelection == 1 && <h1>Crime and Poverty UK</h1>}
      
      <WebMap mapSelection={mapSelection}/>

      <div>
        <h2>UI</h2>
        <select onChange={handleMapChange} value={mapSelection}>
          <option value={0}>Avon and Somerset Map</option>
          <option value={1}>Crime and Poverty UK</option>
        </select>
      </div>
    </>
  )
}

export default App;
