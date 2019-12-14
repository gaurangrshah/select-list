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
      // TODO:  add 2nd condition to disable when approriate
      return setListItems(ListItems(items)); // *** creates list item component and saves to state
    } // active added to dependencies, to force ui to render on keypress
  }, [items, active]);

  const ListItems = items =>
    //TODO:  use props.SortBy value to target item to sort array by.
    items.map((item, i) => {
      // console.log(items[i], i);
      return (
        <ListItem
          id={i}
          key={i}
          className={`item ${active === i ? "active" : null}`}
          index={i}
          item={item}
          active={active}
          // accounts for edge case when handling 0 as a value
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(0)}
          onClick={() => handleSelected(active)}
        />
      );
    });

  return <>{listItems}</>; // maps out list item components from state
};
