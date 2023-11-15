import React from "react";
import styled from "styled-components";
import { Flex, Radio, Input } from "antd";
import PropTypes from "prop-types";

const propTypes = {
  isDiscussion: PropTypes.bool,
  onSetAgree: PropTypes.func,
};

const defaultProps = {
  isDiscussion: false,
  onSetAgree: () => {},
};

const DiscussionSection = ({ isDiscussion, onSetAgree }) => {
  return (
    <StyledDiv className="discussion-section">
      <p className="bold-text">
        Do you agree with all requirements provided by the seeker? If you
        disagree, you can start a discussion
      </p>
      <Radio.Group
        onChange={(e) => {
          onSetAgree(e.target.value);
        }}
        defaultValue={true}
        buttonStyle="solid"
      >
        <Radio.Button value={true}>Apprpve</Radio.Button>
        <Radio.Button value={false}>Reject</Radio.Button>
      </Radio.Group>
      {isDiscussion && (
        <div className="discussion-section">
          <p>Add Comment</p>
          <Input.TextArea style={{ height: 150 }} />
        </div>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.discussion-section {
    margin-bottom: 25px;
  }
`;

DiscussionSection.propTypes = propTypes;
DiscussionSection.defaultProps = defaultProps;

export default DiscussionSection;
