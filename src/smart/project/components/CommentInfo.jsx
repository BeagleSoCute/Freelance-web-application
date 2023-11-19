import React from "react";
import styled from "styled-components";
import { Flex, Radio, Input, Button, Row, Col } from "antd";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.object,
};

const defaultProps = {
  data: {},
};

const CommentInfo = ({ data }) => {
  return (
    <StyledDiv className="comment-info">
      <Row>
        <Col span={5} className="profile-section">
          <img
            className="profile-picture"
            alt="profile-pic"
            src={data?.user.profile_picture}
          />
          <p className="name">
            {data?.user.first_name} {data?.user.last_name}
          </p>
        </Col>
        <Col className="content-section" span={18}>
          <p className="date">
            <span className="bold-text">Date:</span> {data?.date}
          </p>
          <p className="status">
            <span className="bold-text">
              Status:            </span>

              {data?.status === "needDiscussion" ? "Need a discussion" : "Edit the requirement"}
          </p>
          <p>{data?.comment}</p>
        </Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.comment-info {
    width: 100%;
    padding: 20px;
    border: 1px solid black;
    .profile-picture {
      width: 200px;
      height: 200px;
    }
    .name {
      text-align: center;
    }
    .content-section {
      padding: 0px 20px;
      border: 1px solid black;
      margin-left: 20px;
    }
    .date {
      font-size: 12px;
    }
    
  }
`;

CommentInfo.propTypes = propTypes;
CommentInfo.defaultProps = defaultProps;

export default CommentInfo;
