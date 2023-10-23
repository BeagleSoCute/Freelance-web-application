import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Flex } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const SkillTags = ({ items }) => {
  const handleRemoveItem = () => {};
  return (
    <StyledDiv className="skill-tags">
      <Flex wrap="wrap" gap="large">
        {items.map((item) => (
          <div className="item" span={4}>
            <p>{item}</p>
            <CloseOutlined
              onClick={() => handleRemoveItem()}
              className="close-icon"
            />
          </div>
        ))}
      </Flex>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.skill-tags {
    .item {
      position: relative;
      padding: 0px 45px;
      border: 1px solid black;
    }
    .close-icon {
      position: absolute;
      top: 5px;
      right: 5px;
      color: red;
      cursor: pointer;
    }
  }
`;

export default SkillTags;
