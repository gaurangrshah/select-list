import React from "react";

export default function ListItem({
  item,
  listItemProperty,
  children,
  ...props
}) {
  return (
    <div tabIndex={-1} {...props}>
      <span>{item[listItemProperty]}</span>
      <span>{children}</span>
    </div>
  );
}
