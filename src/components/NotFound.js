import React from "react";
import MonkeySearch from "../assets/monkey-search.png";

export default () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <img src={MonkeySearch} alt="Not found" />
      <h3 style={{ marginTop: "0.5rem" }}>
        Oops, you are trying to visit a page which seems to be doesn't exist.
      </h3>
    </div>
  );
};
