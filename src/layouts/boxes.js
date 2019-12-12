import React from "react";

export function RoundeBox({ id, classes, children }, ...props) {
  return (
    <div id={id} className={`box_rounded ${classes}`} {...props}>
      {children}
    </div>
  );
}
