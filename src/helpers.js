export function exists(id, arr) {
  // returns true if id exists in arr, false if not
  return arr.some(item => item === id);
}
