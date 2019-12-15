import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Paper from "./components/Paper";
import useFocusListener from "./hooks/useFocusListener";
import { store } from "./data";
import "./styles.css";

function App() {
  const appRef = useRef();

  const isFocused = useFocusListener(appRef, [
    "select-box",
    "select-list",
    "modifier",
    "field-input"
  ]);

  return (
    <div className="App" ref={appRef} tabIndex={0}>
      <Paper
        id="sheet"
        data={store.items}
        listItemProperty={"name"}
        focused={isFocused}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
