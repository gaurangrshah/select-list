import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Paper from "./components/Paper";
import useFocusListener from "./hooks/useFocusListener";
import { store } from "./data";
import "./styles.css";

function App() {
  const appRef = useRef();

  // destructure isFocused, to track which element has focus, if needed.
  const isFocused = useFocusListener(appRef, [
    "select-box",
    "select-list",
    "modifier",
    "field-input"
  ]);

  return (
    <div className="App" ref={appRef} tabIndex={0}>
      <Paper id="sheet" data={store.items} focused={isFocused} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
