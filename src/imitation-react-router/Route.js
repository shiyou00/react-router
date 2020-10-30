import React, { useContext } from "react";
import Context from "./Context";
import { matchPath } from "./matchPath";

const Route = props => {
  const { location, history } = useContext(Context);

  const match = props.computedMatch
    ? props.computedMatch
    : matchPath(location.pathname, props.path);

  return (
    <Context.Provider value={{...match,location,history}}>
      {match ? props.children : null}
    </Context.Provider>
  );
};

export default Route;
