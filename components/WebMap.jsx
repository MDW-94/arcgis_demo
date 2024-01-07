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