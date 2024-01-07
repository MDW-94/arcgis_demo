import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Legend from "@arcgis/core/widgets/Legend.js";
import Expand from "@arcgis/core/widgets/Expand.js";


const webmap_id = [
  "6259ba4ccf294628b70119fbea6b75fd",
  "cb7fa101664f47bcbd0d2642695b60a1"]

export const switchMap = function(selection) {
  return webmap_id[selection];
}

export const webMap = new WebMap({
  portalItem: {
    id: switchMap(0),
  }
});

export const view = new MapView({
  map: webMap,
});

export const legend = new Legend({
  view : view
});

export const expand = new Expand({
  view: view,
  content: new Legend({
            view: view,
            style: "card",
          })
});

view.ui.add(expand, "bottom-right");

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