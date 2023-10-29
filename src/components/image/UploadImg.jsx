import React, { useState, useRef } from "react";
import { message, Button, Row, Col } from "antd";
import styled from "styled-components";
import avatarImg from "assets/img/avatar_default.jpg";
import emptyImg from "assets/img/emptyImg.jpg";
import PropTypes from "prop-types";
const propTypes = {
  pictureURL: PropTypes.string,
  isProfile: PropTypes.bool,
  file: PropTypes.object,
  setFile: PropTypes.func,
};
const defaultProps = {
  pictureURL: "",
  isProfile: false,
  setFile: () => {},
  file: undefined,
};

const UploadImg = ({ file, pictureURL, isProfile, setFile }) => {
  const fileInputRef = useRef(null);
  const [preViewImage, setPreviewImage] = useState();
  const handleChange = (e) => {
    const value = e.target.files[0];
    if (value.type !== "image/jpeg" && value.type !== "image/png") {
      message.error("You can only upload JPG/PNG file!");
      fileInputRef.current.value = "";
      return;
    }
    const limitFileSizeKB = isProfile ? 100 : 500;
    const isExcessSize = value.size <= limitFileSizeKB * 1024;
    if (!isExcessSize) {
      message.error(`Image must be smaller than ${limitFileSizeKB} KB!`);
      fileInputRef.current.value = "";
      return;
    }
    setFile(value);
    setPreviewImage(URL.createObjectURL(value));
  };
  const cancelUpload = () => {
    setFile(undefined);
    setPreviewImage(undefined);
    fileInputRef.current.value = "";
  };

  const renderImage = () => {
    if (pictureURL && !file) {
      return pictureURL;
    } else if ((!pictureURL && file) || (pictureURL && file)) {
      return preViewImage;
    } else if (isProfile) {
      return avatarImg;
    } else {
      return emptyImg;
    }
  };

  return (
    <StyledDiv className="upload-img">
      <Row>
        <Col span={8}> </Col>
        <Col span={8}>
          <Row>
            <Col className="img-section" span={24}>
              <StyledImg
                isProfile={isProfile}
                className="display-img"
                src={renderImage()}
              />
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
    .cancel-btn {
      width: 100%;
    }
    .upload-section {
      margin: auto;
    }
  }
`;

const StyledImg = styled.img`
  height: 250px;
  width: 250px;
  border-radius: ${(props) => (props.isProfile ? "100%" : "0%")};
  border: 1px solid black;
`;

UploadImg.propTypes = propTypes;
UploadImg.defaultProps = defaultProps;

export default UploadImg;
