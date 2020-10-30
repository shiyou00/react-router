import React, { useContext, useCallback } from "react";
import Context from "./Context";

const Link = ({ to, children }) => {
  const { history } = useContext(Context);

  const handleOnClick = useCallback(
    event => {
      event.preventDefault();
      history.push(to);
    },
    [history, to]
  );

  return (
    <a href={to} onClick={handleOnClick}>
      {children}
    </a>
  );
};

export default Link;
