import React, { useState, useRef } from "react";
import { message, Button, Row, Col } from "antd";
import styled from "styled-components";
import avatarImg from "assets/img/avatar_default.jpg";

const UploadImg = () => {
  const [file, setFile] = useState(undefined);
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    console.log(e.target.files);
    const value = e.target.files[0];
    if (value.type !== "image/jpeg" && value.type !== "image/png") {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt100KB = value.size <= 100 * 1024;
    if (!isLt100KB) {
      message.error("Image must be smaller than 100 KB!");
      return;
    }
    setFile(URL.createObjectURL(value));
  };
  const cancelUpload = () => {
    setFile(undefined);
    fileInputRef.current.value = ""; // Clear the input value using ref
  };

  return (
    <StyledDiv className="upload-img">
      <Row>
        <Col span={8}> </Col>
        <Col span={8}>
          <Row>
            <Col className="img-section" span={24}>
              <img className="pic" src={file ? file : avatarImg} />
            </Col>
            {file ? (
              <Button
                danger
                className="cancel-btn"
                onClick={() => cancelUpload()}
              >
                Cancel
              </Button>
            ) : (
            <div className="upload-section">
                <Button>

                <input type="file" onChange={handleChange} ref={fileInputRef} />
                </Button>

            </div>
            )}
          </Row>

          <div></div>
        </Col>
        <Col span={8}></Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.upload-img {
    .img-section {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
    }
    img {
      height: 250px;
      width: 250px;
      border-radius: 100%;
      border: 1px solid black;
    }
    .cancel-btn {
      width: 100%;
    }
    .upload-section{
        margin: auto;
    }
  }
`;
export default UploadImg;
