import { useState, useEffect } from "react";

export default function(targetKey, element = window, cb) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler(e) {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(true);
      return cb && cb();
    }
  }

  const upHandler = e => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    let newElement = element.current ? element.current : element;
    // console.log('newElement', newElement)

    newElement.addEventListener("keydown", downHandler);
    newElement.addEventListener("keyup", upHandler);

    return () => {
      newElement.removeEventListener("keydown", downHandler);
      newElement.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
}
