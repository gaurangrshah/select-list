import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Paper from "./components/Paper";
import Selector from "./components/Selector";
import useFocusListener from "./hooks/useFocusListener";
import OutsideClick from "./hooks/OutsideClick";
import useKeyPress from "./hooks/useKeyPress";
import { store } from "./data";
import "./styles.css";

function App() {
  const appRef = useRef();
  const selectorRef = useRef();
  const [paper, setPaper] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  const toggleShowSelector = () => setShowSelector(!showSelector);
  const commandPalette = useKeyPress("Control" && "/");

  const updatePaperState = newElement => setPaper(st => [...st, newElement]);
  const isFocused = useFocusListener(appRef, [
    "select-box",
    "select-list",
    "modifier",
    "field-input"
  ]);

  useEffect(() => {
    if (commandPalette) toggleShowSelector();
  }, [commandPalette]);

  return (
    <div className="App" ref={appRef} tabIndex={0}>
      <OutsideClick
        controls={{ toggle1: showSelector, handleToggle1: toggleShowSelector }}
      >
        {showSelector && (
          <Selector
            id="select-box"
            data={store.items}
            focused={isFocused}
            listItemProperty={"name"}
            paperState={{ paper, updatePaperState }}
            /* const {focused, listItemProperty, data = store.items} = {...props} */
          />
        )}
      </OutsideClick>
      <Paper id="sheet" paperState={{ paper, updatePaperState }} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
