import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const WebMap = ({ mapSelection }) => {
  const viewRef = useRef();

  useEffect(() => {
    import("../lib/app").then(function (app) {
      app.initialize(viewRef.current, mapSelection);
    });
  }, [mapSelection]);

  return <div className="viewDiv" ref={viewRef} />;
};

export default WebMap;
