import React, { useState, useEffect, useRef } from "react";
import { Input } from "../elements/inputs";
import { Button } from "../elements/buttons";
import List from "../elements/list";
import useKeyPress from "../hooks/useKeyPress";

import { filterSearch, getIndex } from "../helpers";

// =================  ================= ================= =================
// =============== handling selected and updaing selected  ================
// =================  ================= ================= =================
// TODO: handle onClick action to update selected item, from active item,
// triggered by enterpress on list items
// =================  ================= ================= =================

export default function Selector({ data, focused, ...props }) {
  const selectorRef = useRef();
  const inputRef = useRef();
  const listRef = useRef();

  const focusInput = () => inputRef.current.focus();
  const focusList = () => listRef.current.focus();

  const initialItems = data;
  const [items, setItems] = useState(initialItems);

  // selected is represented by each item's own index
  const [selected, setSelected] = useState(undefined);
  const [paper, setPaper] = useState([]);

  // handles list focus on downarrowPress
  useKeyPress("ArrowDown", inputRef, focusList);

  useEffect(() => {
    // console.log("selected - updated", initialItems[selected]);
    // console.log(initialItems);
  }, [selected, initialItems]);

  function clearItemsSelected(clearItems = "only-items") {
    inputRef.current.value = "";
    if (clearItems === "only-items") {
      setItems([]);
    } else {
      setItems(initialItems);
      setSelected(undefined);
    }
    focusInput();
  }

  const handleSelected = val => {
    if (selected) return console.log("selected entry fail"); // don't run if there is already a selection
    // uses index to setSelected
    if (val || val === 0) {
      // sets selected via arrowKeys and enterPress, converts val to string before setting
      setSelected(val === 0 ? val.toString() : val); // handles edge case where setting
      return clearItemsSelected(); // - removes "only-items"
    }
    // sets selected on search input Submit
    let { value } = inputRef.current; // uses reference value to setSelected
    let index = getIndex(value, initialItems);
    index && setSelected(index);
    return clearItemsSelected(); // - removes "only-items"
  };

  const handleSubmit = e => {
    e.preventDefault();
    // call handle selected if nothing is selected
    if (!selected) return handleSelected();
    let { value } = inputRef.current;
    if (selected && value) {
      // create new element and add to paperState
      let newElement = Object.assign({}, initialItems[selected]);
      newElement.value = value; // add value property to copied selected item
      setPaper(st => [...st, newElement]); // set state wtih updated item
      return clearItemsSelected(false);
    }
  };

  const [showList, setShowList] = useState(false);
  const toggleShowList = () => setShowList(!showList);

  return (
    <>
      <small>
        {/* <mark>{`store: ${JSON.stringify(store.items)}`}</mark> */}
        <mark>{`selected: ${JSON.stringify(initialItems[selected])}`}</mark>
        <br />
        <mark>{`paper: ${JSON.stringify(paper)}`}</mark>
      </small>
      <br />
      <div className={`container`} ref={selectorRef} {...props}>
        <form onSubmit={handleSubmit} tabIndex={-1}>
          <Input
            ref={inputRef}
            styles={{ border: "1px solid blue" }}
            id={`field-input`}
            type="text"
            // items={items}
            defaultValue={""}
            placeholder={!selected ? `search...` : "value"}
            onChange={e =>
              filterSearch(e.target.value, items, setItems, initialItems)
            }
            autoComplete="off"
            onFocus={!showList ? toggleShowList : null}
          />
          <Button
            id={`modifier`}
            onClick={selected ? clearItemsSelected : handleSelected}
            type="button"
            children={selected ? initialItems[selected].name : "select..."}
            disabled={!selected}
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
            />
          </span>
        )}
      </div>
    </>
  );
}
