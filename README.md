# 🗾 ArcGIS SDK Javascript & React + Vite (ES)

## Setup and Installation
First we create the React framework via Vite:

<sub>Follow the setup for the application, a name for the project, Javascript or Typscript etc.</sub>

```bash
npm create vite@latest
cd <project_name>
```
Install dependencies including ArcGIS dependencies:

```bash
npm i
npm i @arcgis/core@latest
```
<i> (This setup follows the ES build guide for ArcGIS SDK Javascript)

<sub>npm i @arcgis/core@latest installs all necessary packages to build ArcGIS locally rather than through the AMD require() method</sub></i>

Removing unneccessary Vite setup files would leave us with a folder structure like this:

```bash
# /ArcGIS_demo - Folder Structure
index.html
package-lock.json
package.json
vite.config.js
.eslintrc.cjs
/src
  App.jsx
  main.jsx
  index.css
/public
  vite.svg
/node_modules

```

### Creating React Component with ArcGIS Map
First we need to import the CSS from Esri's CDN for ArcGIS:

#### Importing ArcGIS CSS from CDN into application
```bash
cd src
echo '@import "https://js.arcgis.com/4.28/@arcgis/core/assets/esri/themes/dark/main.css";' >> index.css
```
<i> - Here we're opening the src folder of our React app and insert the line of code below into the index.css file - See note on Setup for more information - </i>

index.css
@import "https://js.arcgis.com/4.28/@arcgis/core/assets/esri/themes/dark/main.css";

##### Notes on CSS Setup

<q>By default, the API's assets are pulled from the ArcGIS CDN at runtime and there is no need for additional configuration. One advantage of using the CDN is the APIs CSS styles will not need to be bundled on-disk with your local build. The assets include styles, images, web workers, wasm and localization files. This behavior is based on the default setting for config.assetsPath.</q>

#### Editing the index.html so React UI & ArcGIS Map appear in application

Our WebMap React component will be returned as a div tag with a classname = "viewDiv" - <i>this is just convention through the ArcGIS docs</i>

We need to define the height and width of the container for our ArcGIS Map component. Below shows the <style> tag (CSS) that defines our application to be 100% width and height of the browser but defines the ArcGIS Map to be 80% height, 100% width. 

<sub><b>This is to demonstrate that the component can be resized and embedded within the context of a React application - it does not need to take 100% of the height or width in the viewport</b></sub>

```bash
# index.html
<style>
  /* Whole App */
      html,
      body {
        overflow: hidden;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        font-feature-settings: "liga" 1, "calt" 0;
        background: black;
      }

      /* Map CSS */
      #root, .viewDiv {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 80%;
        letter-spacing: 0em;
        line-height: 1.55rem;
      }
</style>

```

I've opted for white centered text on the background of my React application - you can use whatever you like!

```bash
# index.css
body {
  text-align: center;
  color: antiquewhite;
}
```

#### Creating the ArcGIS React Component
Now we will create the ArcGIS React component. This is done by making a new directory, creating a new .jsx file and populating this file with the necessary React hooks required to initialize the map at runtime (this includes persisting a value that does not need re-rendering - our ArcGIS map):

```bash
# /ArcGIS_demo
mkdir component
cd component
touch WebMap.jsx
```

Opening up the WebMap.jsx we can then sfc (stateless function component) with React simple snippets or if you don't have the extension:

```bash
#WebMap.jsx
const WebMap = () => {

  return(
    <div></div>
  );
};

export default WebMap;
```

We've now created an empty React component but need to add in the necessary React hooks, create and import an app.js, declare the initialize function and return this through our div tag.

Let's continue:

```bash
#WebMap.jsx
import { useEffect, useRef } from "react";

const WebMap = () => {

    const viewRef = useRef();

    useEffect(() => {
        import("../lib/app").then(function(app){
            app.initialize(viewRef.current)
        })
    })

    return ( 
    <div className="viewDiv" ref={viewRef}/>
    );
}
 
export default WebMap;
```

<q>What's happening here?</q> 
We're using the React hooks useEffect and useRef within our React component 

- the useEffect renders it's body of code upon runtime, within here it imports the necessary file (app.js), waits for this to be completed (.then()) and runs a function which takes in the app file and performs the initialize function upon it.

- the useRef is declared in the viewRef variable which is called within the initialize function at it's current state (first render) and then passed into the div tag as a ref

Our ArcGIS Map is not yet loaded though, two more steps:

##### app.js

Create another directory within the global app directory (outside components, alongside index.html et al):

```bash
mkdir lib
cd lib
touch app.js
```

<b>This is where we will be calling in the ES modules from the @arcgis/core@latest library</b>

Here we go:

```bash
# app.js
import WebMap from "@arcgis/core/WebMap";

const webmap_id = <insert_chosen_webmap_id_from_ArcGISOnline_as_string>

export const webMap = new WebMap({

  portalItem: {
    id: webmap_id,
  }
});
```
- We've declared that we want a WebMap from the @arcgis/core library
- We've declared a variable to store our ID reference to the webmap we want to pull in from ArcGIS Online
- We've declared a constructor with the necessary parameters we want for our WebMap (mainly the ID reference) and exported this constructor

A map needs a view in order to be scene through the ArcGIS UI - let's declare one now:

```bash
# app.js
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

const webmap_id = <insert_chosen_webmap_id_from_ArcGISOnline_as_string>

export const webMap = new WebMap({
  portalItem: {
    id: webmap_id,
  }
});

export const view = new MapView({
  map: webMap,
});
```

Now we have both our WebMap and MapView constructors ready to be exported, however we still need to declare and export our initialize function - let's add this in at the end of our code:

```bash
# app.js
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

const webmap_id = <insert_chosen_webmap_id_from_ArcGISOnline_as_string>

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
```

The initialize function takes in a parameter (our "container" which is the viewRef.current (useRef()) from WebMap.jsx) then sets the view (the MapView) .container to viewRef.current. This renders our ArcGIS Map at the start, the intitialize function proceeds to unmount the container in the return - avoiding unnecssary renders of the map at the start.

We've not quite got our map yet, one last thing:

##### importing WebMap.jsx as React component in App.jsx
We finally import our WebMap with all the setup into our React App.jsx file - i've included extra features around the map to emphasize that ArcGIS can be embedded into an application.

```bash
#App.jsx
import WebMap from "../components/WebMap"

function App() {

  return (
    <>
      <h1>My ArcGIS Map in a React Application</h1>
      <WebMap/>
      <h2>UI?</h2>
    </>
  )
}

export default App;
``` 

### Running the Application

```bash
# /ArcGIS_demo
npm run dev
```

Application will be hosted locally in the browser. Your ArcGIS Map is loaded into your React application 🗾

#### Note - ES module builds without an API_KEY from a developers account will require authentication upon startup if WebMap or any ArcGIS product isn't shared as public

#### Resources:

- https://developers.arcgis.com/javascript/latest/es-modules/#working-with-assets
- https://developers.arcgis.com/javascript/latest/get-started/
- https://www.esri.com/about/newsroom/arcuser/react-arcgis/
