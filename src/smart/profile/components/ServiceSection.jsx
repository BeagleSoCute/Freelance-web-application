import React from "react";
import { Row, Col, Button } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import CardComponent from "components/common/CardComponent";
import { useNavigate } from "react-router-dom";
const propTypes = {
  serviceData: PropTypes.object,
  seekingData: PropTypes.object,
};
const defaultProps = {
  serviceData: {
    open: 0,
    close: 0,
    total: 0,
  },
  seekingData: {
    open: 0,
    close: 0,
    total: 0,
  },
};
const renderFeedback = (data, title) => {
  return (
    <div className="content-section">
      <h2>{title}</h2>
      <p>
        <span className="bold-text">Open: </span>
        {data.open}
      </p>
      <p>
        <span className="bold-text">Close: </span>
        {data.close}
      </p>
      <p>
        <span className="bold-text">Total: </span>
        {data.total}
      </p>
    </div>
  );
};
const ServiceSection = ({ serviceData, seekingData }) => {
  const navigate = useNavigate();
  return (
    <StyledDiv className="service-section">
      <Row className="content-wrapper">
        <Col className="seeker-section" span={12}>
          <CardComponent
            description={renderFeedback(serviceData, "Servive seeking")}
            noImage={true}
            isView={true}
            onView={() => navigate("/feedback")}
          />
        </Col>
        <Col className="freelancer-section" span={12}>
          <CardComponent
            description={renderFeedback(seekingData, "Servcie providing")}
            noImage={true}
            isView={true}
            onView={() => navigate("/seeking")}
          />
        </Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.service-section {
    display: flex;
    justify-content: center;
    .content-wrapper {
      margin-right: 25px;
    }
  }
`;

ServiceSection.propTypes = propTypes;
ServiceSection.defaultProps = defaultProps;
export default ServiceSection;
