import React, { useContext } from "react";
import Context from "./Context";
import { matchPath } from "./matchPath";

const Switch = props => {
  const context = useContext(Context);

  const location = context.location;

  let element,
    match = null;

  React.Children.forEach(props.children, child => {
    if (match === null && React.isValidElement(child)) {
      element = child;

      const path = child.props.path;

      match = path
        ? matchPath(location.pathname, child.props.path)
        : context.match;
    }
  });

  return match
    ? React.cloneElement(element, { location, computedMatch: match })
    : null;
};

export default Switch;
