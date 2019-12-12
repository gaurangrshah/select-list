import React, { useState, createContext } from "react";
import useEventListener from "./useEventListener";

export default function useFocusListener(ref, watchers) {
  const [watched, setWatched] = useState(watchers ? watchers : "app");
  const [isFocused, setIsFocused] = useState("");
  // helper - check if id exists
  function exists(id, arr) {
    // console.debug(`isWatched focused--${id}`, arr.some(item => item === id));
    return arr.some(item => item === id);
  }
  const handleListener = e => {
    // listener used to debug focus
    e.preventDefault() && e.persist();
    if (!e.target.id) return console.debug("notarget in listener");
    // console.debug(`--- isWatched -- ${e.target.id}---${e.type}---!!!check  `);
    // console.debug("element", document.getElementById(e.target.id));
    exists(e.target.id, watched) && setIsFocused(e.target.id);
    // console.warn(exists(e.target.id, watched) && e.target.id, "is watched");
    // create useEffect that updates any matches from watched.some to isFocused
  };

  useEventListener(ref, "focusin", handleListener);
  useEventListener(ref, "focusout", handleListener);

  return isFocused;
}
