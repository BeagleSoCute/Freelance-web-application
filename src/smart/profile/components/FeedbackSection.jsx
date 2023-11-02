import React from "react";
import { Row, Col, Button } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import CardComponent from "components/common/CardComponent";
import { useNavigate } from "react-router-dom";
const propTypes = {
  feedbackData: PropTypes.object,
};
const defaultProps = {
  feedbackData: {
    seeker_feedbacks: {
      positive: 0,
      negative: 0,
      neutral: 0,
    },
    provider_feedbacks: {
      positive: 0,
      negative: 0,
      neutral: 0,
    },
  },
};
const renderFeedback = (data, title) => {
  return (
    <div className="content-section">
      <h1>{title}</h1>
      <p>
        <span className="bold-text">Positive: </span>
        {data.positive}
      </p>
      <p>
        <span className="bold-text">Negative: </span>
        {data.negative}
      </p>
      <p>
        <span className="bold-text">Neutral: </span>
        {data.neutral}
      </p>
    </div>
  );
};
const FeedbackSection = ({ feedbackData }) => {
  const navigate = useNavigate();
  return (
    <StyledDiv className="feedback-section">
      <Row className="content-wrapper">
        <Col className="seeker-section" span={12}>
          <CardComponent
            description={renderFeedback(
              feedbackData.seeker_feedbacks,
              "As a seeker"
            )}
            noImage={true}
            isView={true}
            onView={() => navigate("/feedback")}
          />
        </Col>
        <Col className="freelancer-section" span={12}>
          <CardComponent
            description={renderFeedback(
              feedbackData.provider_feedbacks,
              "As a freelancer"
            )}
            noImage={true}
            isView={true}
            onView={() => navigate("/feedback")}
          />
        </Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.feedback-section {
    display: flex;
    justify-content: center;
    .content-wrapper {
      margin-right: 25px;
    }
  }
`;

FeedbackSection.propTypes = propTypes;
FeedbackSection.defaultProps = defaultProps;
export default FeedbackSection;
