import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Legend from "@arcgis/core/widgets/Legend.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";

export const webmaps = [
  {
    id: '6259ba4ccf294628b70119fbea6b75fd',
    title: 'Avon and Somerset Crime Data',
    info: "A web map created via the ArcGIS Online platform and imported via ID - This map shows a basemap of graphical points (a feature layer) displaying crime data taken from  https://data.police.uk/data/ - it focuses on the Avon and Somerset in the UK"
  },
  {
    id: 'cb7fa101664f47bcbd0d2642695b60a1',
    title: 'Crime and Poverty UK',
    info: "A web map created via the ArcGIS Online platform and imported via ID - The datasets featured in this map include the Indices of Multiple Deprivation 2019 published by the governing bodies of the UK and Wales (accessed through Esri's Living Atlas) compared with street-level crime CSV data from Data.Police.UK."
  },
  {
    id: '7279ba79922042f99da8bf3fc1e36a90',
    title: 'Plain Map',
    info: "This is a plain basemap with no data layers loaded into it"
  }
]

function initialiseView(mapId) {
  return new MapView({
    map: new WebMap({
      portalItem: {
        id: mapId,
      },
    }),
  });
}

export const initialize = function (container, webMap_id) {
  const view = initialiseView(webMap_id);
  view.container = container;

  const layerList = new LayerList({
    container: document.createElement("div"),
    view: view,
  });

  const layerExpand = new Expand({
    view: view,
    content: layerList,
  });

  const expand = new Expand({
    view: view,
    content: new Legend({
      view: view,
      style: "card",
    }),
  });
  
  view.ui.add(expand, "bottom-right");
  view.ui.add(layerExpand, "top-right");
  view
    .when()
    .then(() => {
      console.log("Map and View are ready.");
    })
    .catch((error) => console.error(error));

  return () => {
    view.container = null;
  }; // after container dismounts map is removed
};
