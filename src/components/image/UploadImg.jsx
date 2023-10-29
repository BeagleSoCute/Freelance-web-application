import React, { useState, useRef } from "react";
import { message, Button, Row, Col } from "antd";
import styled from "styled-components";
import avatarImg from "assets/img/avatar_default.jpg";
import PropTypes from "prop-types";

const propTypes = {
  pictureURL: PropTypes.string,
  file: PropTypes.object,
  setFile: PropTypes.func,
};
const defaultProps = {
  pictureURL: "",
  setFile: () => {},
  file: undefined,
};

const UploadImg = ({ file, pictureURL, setFile }) => {
  const fileInputRef = useRef(null);
  const [preViewImage, setPreviewImage] = useState();
  const handleChange = (e) => {
    const value = e.target.files[0];
    if (value.type !== "image/jpeg" && value.type !== "image/png") {
      message.error("You can only upload JPG/PNG file!");
      fileInputRef.current.value = ""; // Clear the input value using ref
      return;
    }
    const isLt100KB = value.size <= 100 * 1024;
    if (!isLt100KB) {
      message.error("Image must be smaller than 100 KB!");
      fileInputRef.current.value = ""; // Clear the input value using ref
      return;
    }
    setFile(value);
    setPreviewImage(URL.createObjectURL(value));
  };
  const cancelUpload = () => {
    setFile(undefined);
    setPreviewImage(undefined);
    fileInputRef.current.value = ""; // Clear the input value using ref
  };

  const renderImage = () => {
    if (pictureURL && !file) {
      return pictureURL;
    } else if (!pictureURL && file || pictureURL && file) {
      return preViewImage;
    } else {
      return avatarImg;
    }
  };

  return (
    <StyledDiv className="upload-img">
      <Row>
        <Col span={8}> </Col>
        <Col span={8}>
          <Row>
            <Col className="img-section" span={24}>
              <img className="pic" src={renderImage()} />
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
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    ref={fileInputRef}
                  />
                </Button>
              </div>
            )}
          </Row>
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
    .upload-section {
      margin: auto;
    }
  }
`;
export default UploadImg;
