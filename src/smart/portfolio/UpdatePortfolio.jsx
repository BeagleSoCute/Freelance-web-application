import React from "react";
import styled from "styled-components";
import { Row, Col, Form, Button } from "antd";
import PropTypes from "prop-types";
import UploadImg from "components/image/UploadImg";

const UpdatePortfolio = () => {
  const uploadImgProps = {
    // pictureURL: user.profile_picture,
    // file: file,
    // setFile: setFile,
  };
  return (
    <StyledDiv>
      <h1>Add Portfolio</h1>
      <Row>
        <Col span={24}>
          <h2 className="title">Profile Management</h2>
          <UploadImg {...uploadImgProps} />
        </Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.update-portfolio {
  }
`;
export default UpdatePortfolio;
