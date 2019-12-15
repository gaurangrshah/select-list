import { useState } from "react";
import useEventListener from "./useEventListener";

export default function useFocusListener(ref, watchers) {
  const [watched] = useState(watchers ? watchers : "app");
  const [isFocused, setIsFocused] = useState("");
  // helper - check if id exists
  function existsId(id, arr) {
    // console.debug(`isWatched focused--${id}`, arr.some(item => item === id));
    return arr.some(item => item === id);
  }
  const handleListener = e => {
    // listener used to debug focus
    e.preventDefault() && e.persist();
    if (!e.target.id)
      // return setIsFocused(false) && console.debug("notarget in listener");
      // console.debug(`--- isWatched -- ${e.target.id}---${e.type}---!!!check  `);
      // console.debug("element", document.getElementById(e.target.id));
      existsId(e.target.id, watched)
        ? setIsFocused(e.target.id)
        : setIsFocused(false);
    // console.warn(
    //   existsId(e.target.id, watched) && e.target.id,
    //   "is watched",
    //   isFocused
    // );
    // create useEffect that updates any matches from watched.some to isFocused
  };

  useEventListener(ref, "focusin", handleListener);
  useEventListener(ref, "focusout", handleListener);

  return isFocused;
}
