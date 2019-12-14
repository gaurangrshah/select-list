import React from "react";

export default function ListItem({ item, children, ...props }) {
  return (
    <div tabIndex={-1} {...props}>
      <span>{item.name}</span>
      <span>{children}</span>
    </div>
  );
}
