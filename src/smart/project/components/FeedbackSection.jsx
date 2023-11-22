import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentInfo from "smart/project/components/CommentInfo";
import { Flex, Select, Input, Button } from "antd";
import styled from "styled-components";
const propTypes = {
  feedbackList: PropTypes.array,
  isDoneFeedback: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  feedbackList: [],
  isDoneFeedback: false,
  onSubmit: () => {},
};

const options = [
  { label: "Positive", value: "positive" },
  { label: "Netrual", value: "netrual" },
  { label: "Negative", value: "negative" },
];

const FeedbackSection = ({
  feedbackList,
  isDoneFeedback,
  myRole,
  onSubmit,
}) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const handleSubmit = () => {
    onSubmit({ rating, comment });
  };
  return (
    <StyledDiv className="feedback-section">
      <Flex justify="center">
        <h2>Feedback</h2>
      </Flex>
      {!isDoneFeedback ? (
        <div className="input-section">
          {myRole === "freelancer" && (
            <p className="alert-text">
              The system will transfer money to your back account after you
              provide a feedback to your client
            </p>
          )}
          <p
            className="bold-text
        "
          >
            Select rating:
          </p>
          <Select
            placeholder="Select rating"
            options={options}
            onChange={(value) => setRating(value)}
            style={{ width: 150, marginBottom: 5 }}
          />
          <p
            className="bold-text
        "
          >
            Comment:
          </p>
          <Input.TextArea
            onChange={(e) => setComment(e.target.value)}
            style={{ height: 150, marginBottom: 15 }}
          />
          <Flex justify="center">
            <Button onClick={() => handleSubmit()} className="normal-btn">
              Add
            </Button>
          </Flex>
        </div>
      ) : (
        <Flex justify="center">
          <p className="bold-text">You have done your feedback</p>
        </Flex>
      )}
      <div className="feedback-list-section">
        {feedbackList &&
          feedbackList.map((item) => (
            <CommentInfo data={item} isFeedback={true} />
          ))}
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.feedback-section {
    .feedback-list-section {
      margin-top: 20px;
    }
  }
`;

FeedbackSection.propTypes = propTypes;
FeedbackSection.defaultProps = defaultProps;
export default FeedbackSection;
