import React, { useState, useEffect, forwardRef } from "react";
import { RenderListItems } from "../components/RenderListItems";
import useKeyPress from "../hooks/useKeyPress";

const List = forwardRef(
  (
    {
      id,
      items,
      selected,
      handleSelected,
      sortBy,
      focusInput,
      toggleShowList,
      onItemClick,
      listItemProperty,
      children,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = useState(0);

    // ############ ############  ############  ############  ############
    // ############ ############  ############  ############  ############
    const toggleUp = () => {
      if (active === 0) return focusInput();
      setActive(active - 1);
      return;
    };

    const toggleDown = () => {
      if (active === items.length - 1) return;
      setActive(active + 1);
      return;
    };

    const submitSelected = () => {
      let currActive = active;
      handleSelected(currActive);
      setActive(0); // resets active when submitted
      return;
    };

    useKeyPress("ArrowDown", ref, toggleDown);
    useKeyPress("ArrowUp", ref, toggleUp);
    useKeyPress("Enter", ref, submitSelected);
    // ############ ############  ############  ############  ############
    // ############ ############  ############  ############  ############

    return (
      <div id={id} ref={ref} tabIndex={1} {...props}>
        <RenderListItems
          items={items}
          active={active}
          setActive={setActive}
          sortBy={sortBy}
          handleSelected={handleSelected}
          listItemProperty={listItemProperty}
        />
        <span>{children}</span>
      </div>
    );
  }
);

export default List;
