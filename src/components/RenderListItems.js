import React, { useState, useEffect, useRef } from "react";
import ListItem from "../elements/listItem";

export const RenderListItems = ({ id, items, focused, active }) => {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (items) {
      // add 2nd condition to disable when approriate
      return setListItems(ListItems(items));
    }
  }, [items, active]);

  const ListItems = items =>
    items.map((item, i) => (
      <ListItem
        key={i}
        index={i}
        item={item}
        focused={focused}
        active={active}
      />
    ));

  return <>{listItems}</>;
};
