import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, Select, message, Row, Col, Flex } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const propTypes = {
  postType: PropTypes.string,
  data: PropTypes.object,
  isProbideService: PropTypes.bool,
};

const defaultProps = {
  postType: "provideService",
  isProbideService: true,
  data: {
    title: "",
    description: "",
    related_portfolios: [],
    date: "",
    type: "",
    area: "",
    category: "",
    owner: {
      first_name: "",
      last_name: "",
    },
  },
};

const ShowPostContentSection = ({postType, data, isProbideService }) => {
  const navigate = useNavigate();
  const {
    title,
    description,
    related_portfolios,
    status,
    date,
    type,
    area,
    category,
    owner,
  } = data;
  return (
    <StyledDiv className="show-post-content-section">
      <div>
        <h1>{ postType==='provideService' ? "Provide Service" : "Find a freelancer"}</h1>
      </div>
      <div>
        <h2>{title}</h2>
      </div>
      <Flex gap="large">
        <p>
          <span className="bold-text">Post by:</span>
          {owner?.first_name} {owner?.last_name}
        </p>
        <Button onClick={() => navigate(`/profile/${owner?._id}`)} className="review-btn">Review Profile</Button>
      </Flex>
      <div>
      <p>
          <span className="bold-text">Status:</span>
          {status}
        </p>
        <p>
          <span className="bold-text">Date:</span>
          {date}
        </p>
      </div>
      <Flex gap="large">
        <p>
          <span className="bold-text">Type:</span>
          {type}
        </p>
        <p>
          <span className="bold-text">Area:</span>
          {area}
        </p>
        <p>
          <span className="bold-text">Category:</span>
          {category}
        </p>
      </Flex>
      <div>
        <p className="bold-text">
          {isProbideService ? "Service Description:" : "Requirement:"}
        </p>
        <p>{description}</p>
      </div>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  &.show-post-content-section {
    span {
      margin-right: 5px;
    }
    .review-btn{
      margin: auto 0px;
    }
  }
`;

ShowPostContentSection.propTypes = propTypes;
ShowPostContentSection.defaultProps = defaultProps;

export default ShowPostContentSection;
