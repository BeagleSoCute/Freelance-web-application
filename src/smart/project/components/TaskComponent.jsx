import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
const propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  priority: PropTypes.string,
  progress: PropTypes.string,
};

const defaultProps = {
  title: "title",
  date: "date",
  priority: "high",
  progress: "progress",
};

const TaskComponent = ({ title, date, priority, progress }) => {
  return (
    <StyledDiv className="task-component">
      <Flex justify="space-between">
        <div className="bold-text">{title}</div>
        <div>{date}</div>
      </Flex>
      <p>
        <span className="bold-text">Priority:</span>
        {priority}
      </p>
      <p>
        <span className="bold-text">Progress:</span>
        {progress}
      </p>
      <Flex justify="center">
        <Button>View</Button>
      </Flex>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.task-component {
    padding: 20px;
    border: 1px solid black;
    margin: 0px 10px;
    button {
      margin-top: 5px;
      width: 250px;
    }
  }
`;

TaskComponent.propTypes = propTypes;
TaskComponent.defaultProps = defaultProps;
export default TaskComponent;
