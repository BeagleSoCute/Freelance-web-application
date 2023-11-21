import React from "react";
import styled from "styled-components";
import { Flex, Input, Button } from "antd";
import PropTypes from "prop-types";
import CommentInfo from "smart/project/components/CommentInfo";

const propTypes = {
  onSetAgree: PropTypes.func,
  onAdd: PropTypes.func,
  isDisable: PropTypes.bool,
};

const defaultProps = {
  onAdd: () => {},
  isDisable: false,
};

const ProjectCommentSection = ({
  inputValue,
  commentList,
  isDisable,
  onAdd,
  onChange,
}) => {
  return (
    <StyledDiv className="project-comment-section">
      {isDisable ? (
        ""
      ) : (
        <>
          <div className="project-comment-section">
            <p>Add Comment</p>
            <Input.TextArea
              onChange={(e) => onChange(e)}
              value={inputValue}
              style={{ height: 150 }}
            />
          </div>
          <Flex justify="center">
            <Button onClick={() => onAdd()}>Add</Button>
          </Flex>
        </>
      )}
      <Flex justify="center">
        <h2>Comment Section</h2>
      </Flex>
      <div>
        {commentList?.map((item) => (
          <CommentInfo data={item} />
        ))}
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.project-comment-section {
    margin-bottom: 25px;
    button {
      margin-top: 20px;
      width: 250px;
    }
  }
`;

ProjectCommentSection.propTypes = propTypes;
ProjectCommentSection.defaultProps = defaultProps;

export default ProjectCommentSection;
