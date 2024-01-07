import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Legend from "@arcgis/core/widgets/Legend.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";



const webmap_id = [
  "6259ba4ccf294628b70119fbea6b75fd",
  "cb7fa101664f47bcbd0d2642695b60a1",
  "7279ba79922042f99da8bf3fc1e36a90"]

export const switchMap = function(selection) {
  return webmap_id[selection];
}

export const webMap = new WebMap({
  portalItem: {
    id: switchMap(1),
  }
});

export const view = new MapView({
  map: webMap,
});

export const layerList = new LayerList({
  container: document.createElement("div"),
  view: view
});

export const layerExpand = new Expand({
  view: view,
  content: layerList
})

export const expand = new Expand({
  view: view,
  content: new Legend({
            view: view,
            style: "card",
          })
});

view.ui.add(expand, "bottom-right");
view.ui.add(layerExpand, "top-right");

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