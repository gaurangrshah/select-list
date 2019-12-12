import React from "react";

export default function ListItem({
  idx,
  index,
  classes,
  focused,
  active,
  styles,
  selected,
  item,
  children
}) {
  return (
    <div
      id={idx}
      className={`
      item
      ${classes}
      ${active === index ? "active" : null}
      `}
      // ${(selected && "selected") || ""}
      style={styles}
      tabIndex={"-1" || index}
      onFocus={e => e.persist() && console.log(e)}
    >
      <span>{item.name}</span>
      <span>{children}</span>
    </div>
  );
}
