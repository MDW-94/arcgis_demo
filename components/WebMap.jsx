import { useEffect, useRef } from "react";
import { switchMap } from "../lib/app";

// eslint-disable-next-line react/prop-types
const WebMap = ({mapSelection}) => {

    const viewRef = useRef();

    useEffect(() => {
        import("../lib/app").then(function(app){
            const selectMapId = switchMap(mapSelection);
            app.webMap.portalItem.id = selectMapId;
            app.initialize(viewRef.current)
        })
    }, [mapSelection])

    return ( 
    <div className="viewDiv" ref={viewRef}/>
    );
}


 
export default WebMap;