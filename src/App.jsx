import { useState } from "react"
import WebMap from '../components/WebMap';
import { webmaps } from '../lib/app'

function App() {

  const [mapSelection, setMapSelection] = useState(webmaps[1].id);

  const handleMapChange = (event) => {
    setMapSelection(event.target.value);
    console.log(event.target.value)
  }

  return (
    <>
      <h1>{webmaps.find((webmap) => webmap.id == mapSelection).title}</h1>
      
      <WebMap mapSelection={mapSelection}/>

      <div>
        <h2>UI</h2>
        <select onChange={handleMapChange} value={mapSelection}>
          {webmaps.map((webMap) => (
            <option key={webMap.id} value={webMap.id}>{webMap.title}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default App;
