import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

const webmap_id = "6259ba4ccf294628b70119fbea6b75fd"

export const webMap = new WebMap({
  portalItem: {
    id: webmap_id,
  }
});

export const view = new MapView({
  map: webMap,
});

export const initialize = function (container) {
  view.container = container;
  view
    .when()
    .then(() => {
      console.log("Map and View are ready.");
    })
    .catch((error) => console.error(error));
    return () => {
        view.container = null
    } // after container dismounts map is removed
};
