import React from "react";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {
  submitBtnText: PropTypes.string,
  isSubmit: PropTypes.bool,
  isDisable: PropTypes.bool,
  isGoBackOnly: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};
const defaultProps = {
  submitBtnText: 'Submit',
  isSubmit: false,
  isDisable: false,
  isGoBackOnly:false,
  onCancel: () => {},
  onSubmit: () => {},
};
const ContentLayout = ({
  children,
  isGoBackOnly,
  isSubmit,
  onSubmit,
  onCancel,
  isDisable,
  submitBtnText
}) => {
  return (
    <Row className="content-layout">
      <Col span={1}></Col>
      <Col className="child-content" span={22}>
        {children}
        {isSubmit && (
          <Col justify="center" className="submit-button-section" span={24}>
            <Button onClick={() => onCancel()} className="cancel-button">
              {isGoBackOnly ? "Back" : "Cancel"}
            </Button>
            {!isGoBackOnly &&
            <Button
              disabled={isDisable}
              className="submit-button"
              type="primary"
              onClick={() => onSubmit()}
            >
              {submitBtnText}
            </Button>
}
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
