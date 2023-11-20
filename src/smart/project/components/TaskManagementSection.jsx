import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import TaskComponent from "./TaskComponent";

const propTypes = {
  tasks: PropTypes.object,
  onOpenTask: PropTypes.func,
};

const defaultProps = {
  tasks: {},
  onOpenTask: () => {},
};

const taskComponentProps = (item) => {
  return {
    title: item.title,
    date: item.date,
    priority: item.priority,
    progress: item.progress,
  };
};

const TaskManagementSection = ({ tasks, onOpenTask }) => {
  return (
    <StyledDiv className="task-management-section">
      <Flex justify="center">
        <h2>Tasks</h2>
      </Flex>
      <Flex justify="end">
        <Button onClick={onOpenTask} className="normal-btn">
          Add
        </Button>
      </Flex>
      <div className="task-section">
        <h3>Todo</h3>
        <Row className="todo">
          {tasks?.todo.map((item) => (
            <Col span={5}>
              <TaskComponent {...taskComponentProps(item)} />
            </Col>
          ))}
        </Row>{" "}
        <h3>In progress</h3>
        <Row className="in-progress">
          {tasks?.inProgress.map((item) => (
            <Col span={5}>
              <TaskComponent {...taskComponentProps(item)} />
            </Col>
          ))}
        </Row>
        <h3>Done</h3>
        <Row className="done">
          {tasks?.done.map((item) => (
            <Col span={5}>
              <TaskComponent {...taskComponentProps(item)} />
            </Col>
          ))}
        </Row>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.task-management-section {
  }
`;

TaskManagementSection.propTypes = propTypes;
TaskManagementSection.defaultProps = defaultProps;
export default TaskManagementSection;
