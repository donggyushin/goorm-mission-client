import "./style.scss";

import {
  AiOutlineFile,
  AiTwotoneFolder,
  AiTwotoneFolderOpen,
} from "react-icons/ai";
import React, { useState } from "react";

import axios from "axios";
import { endpoint } from "../../consts/consts";

const NodeComponent = ({
  node,
  updateText,
  handleSetSelectedFilePath,
  handleSelectedFileName,
}) => {
  const [selected, setSelected] = useState(false);

  const fileClicked = async () => {
    if (node.type === "file") {
      console.log("file clicked!");
      console.log(node);
      handleSetSelectedFilePath(node.path);
      handleSelectedFileName(node.path);
      try {
        const response = await axios.get(
          `${endpoint}/api/file/read?path=${node.path}`
        );
        const data = response.data;
        if (data) {
          console.log(data.data);
          updateText(data.data);
        } else {
          alert("fail1");
        }
      } catch (err) {
        console.log(err.message);
        alert("fail");
      }
    } else if (node.type === "directory") {
      setSelected((snapshot) => !snapshot);
    }
  };

  return (
    <div className={"node__container"}>
      <span style={{ marginRight: "7px" }}>
        {node.type === "file" && <AiOutlineFile />}
        {node.type === "directory" && selected === false && <AiTwotoneFolder />}
        {node.type === "directory" && selected && <AiTwotoneFolderOpen />}
      </span>
      <span onClick={fileClicked}>{node.name}</span>
      {node.children && (
        <ul className={selected ? undefined : "hidden"}>
          {node.children.map((child, index) => {
            return (
              <NodeComponent
                handleSetSelectedFilePath={handleSetSelectedFilePath}
                updateText={updateText}
                key={index}
                node={child}
                handleSelectedFileName={handleSelectedFileName}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NodeComponent;
