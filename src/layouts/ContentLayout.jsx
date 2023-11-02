import React from "react";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {
  isSubmit: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};
const defaultProps = {
  isSubmit: false,
  onCancel: () => {},
  onSubmit: () => {},
};
const ContentLayout = ({ children, isSubmit, onSubmit, onCancel }) => {
  return (
    <Row className="content-layout">
      <Col span={1}></Col>
      <Col className="child-content" span={22}>
        {children}
        {isSubmit && (
          <Col justify="center" className="submit-button-section" span={24}>
            <Button onClick={() => onCancel()} className="cancel-button">
              Cancel
            </Button>
            <Button
              className="submit-button"
              type="primary"
              onClick={() => onSubmit()}
            >
              Submit
            </Button>
          </Col>
        )}
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

ContentLayout.propTypes = propTypes;
ContentLayout.defaultProps = defaultProps;

export default ContentLayout;
