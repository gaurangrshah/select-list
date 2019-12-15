import React, { useState, useEffect, useRef } from "react";
import { Input } from "../elements/inputs";
import { Button } from "../elements/buttons";
import List from "../elements/list";
import useKeyPress from "../hooks/useKeyPress";

import { filterSearch, getIndex } from "../helpers";

// =================  ================= ================= =================
// =============== handling selected and updaing selected  ================
// =================  ================= ================= =================
// TODO: handle errors for non-matching element search imputs
// =================  ================= ================= =================

export default function Selector({
  data,
  focused,
  paperState,
  listItemProperty,
  ...props
}) {
  const selectorRef = useRef();
  const inputRef = useRef();
  const listRef = useRef();

  const focusInput = () => inputRef.current.focus();
  const focusList = () => listRef.current.focus();

  const initialItems = data;
  const [items, setItems] = useState(initialItems);

  // selected is represented by each item's own index
  const [selected, setSelected] = useState(undefined);

  const [showList, setShowList] = useState(focused);
  const toggleShowList = () => setShowList(!showList);

  // handles list focus on downarrowPress
  useKeyPress("ArrowDown", inputRef, focusList);

  // useEffect(() => {
  //   // console.log("selected - updated", initialItems[selected]);
  //   // console.log(initialItems);
  // }, [selected, initialItems]);

  // ================ ================  ================  ================
  // ================ ================  ================  ================

  // checks any argument to ensure "0" gets handled as truthy value.
  const checkSelected = val => val || val === 0;

  function clearItemsSelected(clearItems = "only-items") {
    inputRef.current.value = ""; // clear input
    if (clearItems === "only-items") {
      // default
      setItems([]); // clear items list
    } else {
      // any other argument, aside from default will trigger this case.
      setItems(initialItems); // reset items
      setSelected(undefined); // clear selected item value
    }
    return focusInput(); // focus input
  }

  // sets selected item, applying proper value for "0" index handling
  function applySelected(val) {
    // console.log("applying selected", (val = val === 0 ? val.toString() : val));
    setSelected(val === 0 ? val.toString() : val);
    return clearItemsSelected(); // - removes "only-items"
  }

  // setNewElement value
  function setNewElement(value, element) {
    if (!selected && !value) {
      return console.warn("cannot set new Element", value);
    }

    let newElement = Object.assign({}, element);
    newElement.value = value; // add value property to copied selected item
    return newElement;
  }

  // ================ ================  ================  ================
  // ================ ================  ================  ================

  const handleSelected = val => {
    if (selected) return console.warn("selected entry fail"); // don't run if there is already a selection

    if (checkSelected(val)) {
      // if val is truthy, then apply else, find index below.
      return applySelected(val);
    }

    if (!selected && !inputRef.current.value) {
      return console.warn("pls make a selection");
    }

    // sets selected on search input Submit // when nothing is selected
    let index = getIndex(inputRef.current.value, initialItems);
    // only runs via handleSubmit form submit // uses index to setSelected
    if (checkSelected(index)) applySelected(index);
    return clearItemsSelected(); // - removes "only-items"
  };

  const handleSubmit = e => {
    e.preventDefault();
    // call handle selected if nothing is selected, then run the rest...
    if (!selected) return handleSelected();

    let { value: currInputValue } = inputRef.current;

    // prevent submitting when value is empty.
    if (!currInputValue) return console.warn("please enter a value");

    // create new element
    const elementToAdd = setNewElement(currInputValue, initialItems[selected]);
    // add to paperState wtih updated item
    elementToAdd && paperState.updatePaperState(elementToAdd);
    return clearItemsSelected(false); // clears all items and selected item.
  };

  return (
    <>
      <small>
        {/* <mark>{`selected: ${JSON.stringify(selected)}`}</mark>
        <br />
        <mark>{`selected: ${JSON.stringify(initialItems[selected])}`}</mark>
        <br /> */}
        <mark>{`paper: ${JSON.stringify(paperState.paper)}`}</mark>
        <br />
      </small>
      <div className={`container`} ref={selectorRef} {...props}>
        <form onSubmit={handleSubmit} tabIndex={-1} className="select-form">
          <Input
            ref={inputRef}
            autoComplete="off"
            styles={{ border: "1px solid blue" }}
            id={`field-input`}
            type="text"
            onFocus={!selected && !showList ? toggleShowList : null}
            placeholder={!selected || selected === 0 ? `search...` : "value"}
            defaultValue={""}
            onChange={e =>
              filterSearch(
                e.target.value,
                items,
                setItems,
                initialItems,
                listItemProperty
              )
            }
          />
          <Button
            id={`modifier`}
            onClick={
              checkSelected(selected) ? clearItemsSelected : handleSelected
            }
            type="button"
            children={
              selected && initialItems[selected]
                ? initialItems[selected][listItemProperty]
                : selected === 0 && initialItems[0]
                ? initialItems[0][listItemProperty]
                : "select..."
            }
            disabled={!checkSelected(selected)}
          />
        </form>

        {showList && (
          <span>
            <List
              ref={listRef}
              id={`select-list`}
              items={items}
              sortBy={"idx"}
              selected={selected}
              handleSelected={handleSelected}
              focusInput={focusInput}
              toggleShowList={toggleShowList}
              listItemProperty={listItemProperty}
            />
          </span>
        )}
      </div>
    </>
  );
}
