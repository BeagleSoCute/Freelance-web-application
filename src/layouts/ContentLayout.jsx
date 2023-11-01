import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";

const ContentLayout = ({ children }) => {
  return (
    <Row className="content-layout">
      <Col span={1}></Col>
      <Col className="child-content" span={22}>
        {children}
      </Col>
      <Col span={1}></Col>
    </Row>
  );
};

const StyledDiv = styled.div`
  &content-layout {
    .child-content {
    }
  }
`;
export default ContentLayout;
