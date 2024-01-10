import { useState } from "react";
import WebMap from "../components/WebMap";
import { webmaps } from "../lib/app";

import "../src/app.css";

function App() {
  const [mapSelection, setMapSelection] = useState(webmaps[2].id);

  const handleMapChange = (event) => {
    setMapSelection(event.target.value);
  };

  return (
    <>
      <h1>{webmaps.find((webmap) => webmap.id == mapSelection).title}</h1>

      <WebMap mapSelection={mapSelection} />

      <div className="react-ui-bottom">
        <select
          onChange={handleMapChange}
          value={mapSelection}
          id="react-select"
        >
          {webmaps.map((webMap) => (
            <option key={webMap.id} value={webMap.id}>
              {webMap.title}
            </option>
          ))}
        </select>

        <p>{webmaps.find((webmap) => webmap.id == mapSelection).info}</p>
      </div>
    </>
  );
}

export default App;
