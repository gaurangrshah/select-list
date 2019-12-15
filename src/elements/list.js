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
      children,
      ...props
    },
    ref
  ) => {
    //edge-case zero issue:  force number to be zero, else throws a NAN error.
    const [active, setActive] = useState(selected ? Number(selected) : 0);

    const toggleUp = () => {
      if (active === 0) return focusInput();
      return setActive(active - 1);
    };
    const toggleDown = () => {
      if (active === items.length - 1) return setActive(0);
      return setActive(active + 1);
    };

    const submitSelected = () => {
      let currActive = active;
      return handleSelected(currActive);
    };
    useKeyPress("ArrowDown", ref, toggleDown);
    useKeyPress("ArrowUp", ref, toggleUp);
    useKeyPress("Enter", ref, submitSelected);

    useEffect(() => {
      // console.log(active);
    }, [active]);

    return (
      <div
        id={id} // id is also being use to set isFocused.
        ref={ref}
        tabIndex={1}
        {...props}
      >
        <RenderListItems
          items={items}
          active={active}
          setActive={setActive}
          sortBy={sortBy}
          handleSelected={handleSelected}
        />
        <span>{children}</span>
      </div>
    );
  }
);

export default List;
