import React from "react";
import Context from "./Context";

export function useParams() {
  return React.useContext(Context).params;
}

export function useHistory() {
  return React.useContext(Context).history;
}

export function useLocation() {
  return React.useContext(Context).location;
}
