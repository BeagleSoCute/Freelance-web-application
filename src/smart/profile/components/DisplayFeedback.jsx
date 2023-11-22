import React from "react";
import PropTypes from "prop-types";
import CommentInfo from "smart/project/components/CommentInfo";
import { Flex, Button } from "antd";
import styled from "styled-components";

const propTypes = {
  feedbackList: PropTypes.array,
};
const defaultProps = {};

const DisplayFeedback = ({ feedbackList, onBack }) => {
  return (
    <StyledDiv className="feedback-section">
      <Flex justify="center">
        <h2>Feedback</h2>
      </Flex>
      <div className="feedback-list-section">
        {feedbackList.legth > 0 && feedbackList.map((item) => (
          <CommentInfo data={item} isFeedback={true} />
        ))}
      </div>
      <Flex justify="center">
        <Button className="normal-btn" onClick={() => onBack()}>
          Go back
        </Button>
      </Flex>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.feedback-section {
    .feedback-list-section {
      margin: 20px 0px;
    }
  }
`;

DisplayFeedback.propTypes = propTypes;
DisplayFeedback.defaultProps = defaultProps;
export default DisplayFeedback;
