import React, { useState } from "react";

export default function Paper({ id, paperState, ...props }) {
  return (
    <div id={id}>
      <mark>{`paper: ${JSON.stringify(paperState.paper)}`}</mark>
    </div>
  );
}
