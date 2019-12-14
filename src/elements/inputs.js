import React, { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return <input ref={ref} tabIndex={1} {...props} />;
});
