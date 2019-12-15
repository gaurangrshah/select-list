export function exists(id, arr) {
  // returns true if id exists in arr, false if not
  return arr.some(item => item === id);
}

export function existsName(name, arr) {
  // returns true if id exists in arr, false if not
  return arr.some(item => item === name);
}
// handle search term from input:
export function filterSearch(term, arr, cb, reset, propertyName) {
  if (!term.length > 0) {
    // if input is cleared, reset items
    return cb(reset);
  }
  // copy current state
  const reference = [...arr];
  // filter thru the copied reference array,
  const matches = reference.filter(item => {
    // handle instant search
    if (item[propertyName].includes(term)) {
      // add current matching item back to state
      cb(st => [{ ...item }]);
      // add current matching item to matches array
      return item;
    }
    // no matches found?  return undefined
    return undefined;
  });
  // update array with all current matches
  cb(matches);
}

export function getIndex(value, arr) {
  // finds the index of the matching item
  if (arr) {
    return [...arr].findIndex(item => item.name === value);
  }

  return console.log("cannot run get index with", value, arr);
}
