import React, { useState } from "react";
import Selector from "./Selector";

export default function Paper({ id, ...props }) {
  const [paper, setPaper] = useState([]);

  const updatePaperState = newElement => setPaper(st => [...st, newElement]);

  return (
    <div id={id}>
      <Selector
        id="select-box"
        {...props}
        paperState={{ paper, updatePaperState }}
      />
      {/* const {focused, data = store.items} = {...props} */}
    </div>
  );
}
