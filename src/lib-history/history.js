function parsePath(path) {
  let partialPath = {};

  if (path) {
    let hashIndex = path.indexOf('#');
    if (hashIndex >= 0) {
      partialPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    let searchIndex = path.indexOf('?');
    if (searchIndex >= 0) {
      partialPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      partialPath.pathname = path;
    }
  }

  return partialPath;
}

function getLocation() {
  const { pathname, search, hash } = window.location;
  return Object.freeze({
    pathname,
    search,
    hash,
    state: null,
  });
}

function getNextLocation(to, state = null) {
  return Object.freeze({
    ...parsePath(to),
    state,
  });
}

let location = getLocation();
let listeners = [];

function push(to, state) {
  location = getNextLocation(to, state);
  window.history.pushState(state, '', to);
  listeners.forEach(fn => fn(location));
}

function listen(fn) {
  listeners.push(fn);
  return function() {
    listeners = listeners.filter(listener => listener !== fn);
  };
}

window.addEventListener('popstate', () => {
  location = getLocation();
  listeners.forEach(fn => fn(location));
});

export const history = {
  get location() {
    return location;
  },
  push,
  listen,
};
