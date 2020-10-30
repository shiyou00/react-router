import { pathToRegexp } from "path-to-regexp";

export function matchPath(pathname, path) {
  const keys = [];
  const regexp = pathToRegexp(path, keys);
  const match = regexp.exec(pathname);

  if (!match) return null;
  const values = match.slice(1);

  return {
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
}
