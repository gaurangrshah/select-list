import React from "react";

export default function button(
  { id, classes, styles, focused, children },
  ...props
) {
  return (
    <button
      id={id}
      className={`${classes}`}
      style={styles}
      onFocus={focused}
      tabIndex={0}
      {...props}
    >
      {children}
    </button>
  );
}
