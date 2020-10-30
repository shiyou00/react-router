import React, { useState, useCallback } from "react";
import { history } from "../lib-history/history";
import Context from "./Context";


const BrowserRouter = props => {
  const [location, setLocation] = useState(history.location);

  const computeRootMatch = useCallback(pathname => {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }, []);

  history.listen(location => {
    setLocation(location);
  });

  return (
    <Context.Provider
      value={{ history, location, match: computeRootMatch(location.pathname) }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default BrowserRouter;
