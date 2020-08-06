import React from "react";
import "./TextItem.css";

/** Component for each word controlling highlight state. */
function TextItem(props) {
    const getHighlight = () => {
        if ((Math.floor(props.data.info.start / 2000) % props.value) === 0) {
            return "highlight"
        }
        return ""
    }

  return (
      <span className={getHighlight()} contentEditable={true} suppressContentEditableWarning={true}>
        {props.data.text}{" "}
      </span>
  );
}

export default TextItem;
