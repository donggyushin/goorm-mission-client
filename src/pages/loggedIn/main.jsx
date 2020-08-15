import "./style.scss";

import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import NodeComponent from "../../components/node/node";
import Tree from "@naisutech/react-tree";
import axios from "axios";
import { endpoint } from "../../consts/consts";

const Main = ({ logout }) => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [selectefFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    console.log(selectedFilePath);
  }, [selectedFilePath]);

  useEffect(() => {
    setTree();
  }, []);

  const updateFile = async () => {
    if (!selectedFilePath) {
      return alert("선택된 파일이 없습니다. ");
    }

    try {
      const response = await axios.put(`${endpoint}/api/file`, {
        text,
        path: selectedFilePath,
      });
      const data = response.data;
      if (data) {
        alert("파일 변경 성공");
      } else {
        alert("파일 변경 실패");
      }
    } catch (err) {
      alert("파일 변경 실패");
    }
  };

  const handleSetSelectedFilePath = (text) => {
    setSelectedFilePath(text);
  };

  const handleSelectedFileName = (text) => {
    setSelectedFileName(text);
  };

  const setTree = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/file/tree`);
      const data = response.data;
      console.log(data);
      setData(data.tree.children);
    } catch (err) {
      alert("프로젝트 파일 불러오기 실패");
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    this.fileUpload(file).then((response) => {
      console.log(response.data);
    });
  };
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  const fileUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      return alert("파일을 선택해주세요");
    }
    const url = `${endpoint}/api/file/upload`;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(url, formData, config);
      const data = response.data;
      setData(data.tree.children);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  const updateText = (text) => {
    setText(text);
  };

  return (
    <div className={"main"}>
      <Form style={{ paddingLeft: "30px" }} onSubmit={fileUpload}>
        <Form.Group>
          <Form.File
            onChange={onChange}
            accept=".zip, .tar"
            id="exampleFormControlFile1"
            label="Upload your project in zip or tar"
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Upload</Button>
        </Form.Group>
      </Form>
      <div className={"file__list__container"}>
        <div className="file__list">
          <ul>
            {data.map((node, index) => {
              if (index === 0) return;
              return (
                <NodeComponent
                  handleSetSelectedFilePath={handleSetSelectedFilePath}
                  updateText={updateText}
                  key={index}
                  node={node}
                  handleSelectedFileName={handleSelectedFileName}
                />
              );
            })}
          </ul>
        </div>
        <div className="text__edit__container">
          <div className="selected__file__name">{selectefFileName}</div>
          <div className="selected__file__edit__container">
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  style={{
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTop: 0,
                    borderLeft: 0,
                    resize: "none",
                  }}
                  onChange={(event) => {
                    setText(event.target.value);
                  }}
                  value={text}
                  as="textarea"
                  rows="22"
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      <div className="submit__button__container">
        <Button variant="warning" onClick={updateFile}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default Main;
