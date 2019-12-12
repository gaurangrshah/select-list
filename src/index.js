import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Selector from "./components/Selector";
import useFocusListener from "./hooks/useFocusListener";

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
    <div className="App" ref={appRef}>
      <Selector focused={isFocused} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
