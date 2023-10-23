import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Button, Row, Col } from "antd";
import styled from "styled-components";

const UploadImg = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const handleChange = (e) => {
    console.log(e.target.files);
    const value = e.target.files[0];
    if (value.type !== "image/jpeg" && value.type !== "image/png") {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    setFile(URL.createObjectURL(value));
  };

  return (
    <StyledDiv className="upload-img">
      <Button>
        <input type="file" onChange={handleChange} />
      </Button>
      <Row>
        <Col span={8}> </Col>
        <Col span={8}>
          <img className="pic" src={file} />
        </Col>
        <Col span={8}></Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.upload-img {
    img {
      height: 450px;
      width: 100%;
    }
  }
`;
export default UploadImg;
