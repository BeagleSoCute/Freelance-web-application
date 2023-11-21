import React from "react";
import styled from "styled-components";
import { Flex, Radio, Input, Button } from "antd";
import PropTypes from "prop-types";
import CommentInfo from "smart/project/components/CommentInfo";

const propTypes = {
  status: PropTypes.string,
  isDiscussion: PropTypes.bool,
  onSetAgree: PropTypes.func,
  onAdd: PropTypes.func,
};

const defaultProps = {
  isDiscussion: false,
  onSetAgree: () => {},
  onAdd: () => {},
};

const DiscussionSection = ({
  status,
  isDisable,
  myRole,
  comment,
  data,
  isDiscussion,
  onSetAgree,
  onAdd,
  onChange,
}) => {
  return (
    <StyledDiv className="discussion-section">
      {status !== "approve" && (
        <>
          {isDisable ? (
            ""
          ) : (
            <>
              <p className="bold-text">
                {myRole === "freelancer"
                  ? " Do you agree with all requirements provided by the seeker? If you disagree, you can start a discussion"
                  : "Do you agree to edit the project requirement? If not, you can provide a reason"}
              </p>
              <Radio.Group
                onChange={(e) => {
                  onSetAgree(e.target.value);
                }}
                defaultValue={false}
                buttonStyle="solid"
              >
                <Radio.Button value={true}>
                  {myRole === "freelancer" ? "Apprpve" : "Edit Requirement"}
                </Radio.Button>
                <Radio.Button value={false}>Need discussion</Radio.Button>
              </Radio.Group>

              {isDiscussion && (
                <>
                  <div className="discussion-section">
                    <p>Add Comment</p>
                    <Input.TextArea
                      onChange={(e) => onChange(e)}
                      value={comment}
                      style={{ height: 150 }}
                    />
                  </div>
                  <Flex justify="center">
                    <Button onClick={() => onAdd()}>Add</Button>
                  </Flex>
                </>
              )}
            </>
          )}
        </>
      )}
      <Flex justify="center">
        <h2>Comment Section</h2>
      </Flex>
      <div>
        {data?.map((item) => (
          <CommentInfo data={item} />
        ))}
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.discussion-section {
    margin-bottom: 25px;
    button {
      margin-top: 20px;
      width: 250px;
    }
  }
`;

DiscussionSection.propTypes = propTypes;
DiscussionSection.defaultProps = defaultProps;

export default DiscussionSection;
