import { useState, useEffect } from "react";

export default function() {
  const [listened, setListened] = useState(false);
  const [type, setType] = useState(null);
  const [target, setTarget] = useState(null);

  function downHandler(e) {
    if (e) e.preventDefault() && e.persist();
    if (e.type === "mousedown") {
      e.stopPropagation();
      console.log("heard", e.type);
      setListened(true);
      return setType(e.type) && setTarget(e.target);
    }
  }

  const upHandler = e => {
    e.preventDefault() && e.persist();
    if (e.type === "mouseup") {
      e.stopPropagation();
      setListened(false);
      // return setType(null) && setTarget(null);
    }
  };

  useEffect(() => {
    // refactor this to take create a single handle using redux style actions to handle the appropriate keyPress
    // try to see if the listener can be added to the correct dom element instead...by passing it in as a ref?
    const isSupported = window && window.addEventListener;
    if (!isSupported) return;
    window.addEventListener("mousedown", downHandler);
    window.addEventListener("mouseup", upHandler);
    return () => {
      window.addEventListener("mousedown", downHandler);
      window.addEventListener("mouseup", upHandler);
    };
  }, []);

  return [listened, type, target];
}
