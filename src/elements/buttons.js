import React from "react";

export function Button({ focused, children, ...props }) {
  return (
    <button onFocus={focused} tabIndex={0} {...props}>
      {children}
    </button>
  );
}
