import React, { useState, useEffect, useRef } from "react";
import { RenderListItems } from "../components/RenderListItems";
import useKeyPress from "../hooks/useKeyPress";

export default function List({
  id,
  classes,
  styles,
  onFocus,
  focused,
  onBlur,
  items,
  children
}) {
  const isFocused = focused === id;
  // console.debug(focused === id);

  const listRef = useRef();

  const [active, setActive] = useState(0);

  const toggleUp = () => {
    if (active === 0) return;
    // console.log("decrementing active");
    return setActive(active - 1);
  };
  const toggleDown = () => {
    if (active === items.length - 1) return setActive(0);
    // console.log("incrementing active");
    return setActive(active + 1);
  };

  useKeyPress("ArrowDown", listRef, toggleDown);
  useKeyPress("ArrowUp", listRef, toggleUp);

  useEffect(() => {
    // console.log(active);
  }, [active]);

  return (
    <div
      id={id}
      ref={listRef}
      className={`${classes}`}
      style={styles}
      onFocus={onFocus ? onFocus : null}
      onBlur={onBlur ? onBlur : null}
      tabIndex={1}
    >
      <RenderListItems
        key={id}
        items={items}
        focused={isFocused}
        active={active}
      />
      <span>{children}</span>
    </div>
  );
}
