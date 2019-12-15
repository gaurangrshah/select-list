import React, { useState, useEffect } from "react";
import ListItem from "../elements/listItem";

export const RenderListItems = ({
  items,
  active,
  setActive,
  sortBy,
  handleSelected
}) => {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (items) {
      // TODO:  add 2nd condition to disable when approriate, using: focused
      return setListItems(ListItems(items));
      // *** creates list item component and saves actual components to state
    }
  }, [items, active]);

  const ListItems = items =>
    //TODO:  use props.SortBy value to target item to sort array by.
    items.map((item, i) => (
      <ListItem
        id={i}
        key={i}
        className={`item ${active === i ? "active" : null}`}
        index={i}
        item={item}
        // accounts for edge case when handling 0 as a value
        onMouseEnter={() => setActive(i)}
        onMouseLeave={() => setActive(0)}
        onClick={() => handleSelected(active)}
      />
    ));

  return <>{listItems}</>; // maps out list item components from state
};
