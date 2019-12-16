import React, { useRef, useEffect } from "react";

function useOutsideClick(ref, { toggle1, handleToggle1 }) {
  /**
   * Toggle if clicked on outside of element
   */

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      // if ref is a ref and and if current ref doesnt match the event Target.
      let { target } = event;
      let currentRef = ref.current;
      console.log("clicked outside {target, currentRef}", {
        target,
        currentRef
      });
      if (toggle1 === true) {
        return handleToggle1();
      }
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideClick(props) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.controls);

  return (
    <span ref={wrapperRef} tabIndex={-1}>
      {props.children}
    </span>
  );
}
