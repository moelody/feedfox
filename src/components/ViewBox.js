import React, { useContext } from "react";
import Zmage from 'react-zmage'

import { SwitchContext } from "../context/SwitchContext";

export default ({ url }) => {
  const { state } = useContext(SwitchContext);

  return (
    <div className="viewbox">
      <Zmage
        src={state.urls[0]}
        title={"有" + state.urls.length + "张图片"}
        alt="代理失效"
        width="100%"
        set={state.urls.map(
          (url, id) => {
            return {
              src: url,
              alt: id + " image"
            }
          }
        )}
      />
    </div>
  );
};
