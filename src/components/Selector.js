import React, { useState, useEffect, useRef } from "react";
import Input from "../elements/input";
import Button from "../elements/button";
import List from "../elements/list";
import { store } from "../data";

export default function Selector({ focused }) {
  const selectorRef = useRef();
  const [items, setItems] = useState(store.items);

  return (
    <>
      <small>
        {/* <mark>{`store: ${JSON.stringify(store.items)}`}</mark> */}
        {/* <mark>{`isFocused: ${isFocused}`}</mark> */}
      </small>
      <br />
      <div id="select-box" className={`container`} ref={selectorRef}>
        <Input
          styles={{ border: "1px solid blue" }}
          id={`field-input`}
          items={items}
          defaultValue={""}
          placeholder={`search...`}
        />
        <Button id={`modifier`} />
        <span>
          <List
            id={`select-list`}
            items={items}
            sortBy={"idx"}
            focused={focused}
          />
        </span>
      </div>
    </>
  );
}
