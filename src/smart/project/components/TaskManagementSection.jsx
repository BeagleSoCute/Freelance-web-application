import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import TaskComponent from "./TaskComponent";


const propTypes = {};

const defaultProps = {};

const TaskManagementSection = () => {
  return (
    <StyledDiv className="task-management-section">
      <Flex justify="center">
        <h2>Tasks</h2>
      </Flex>
      <Flex justify="end">
        <Button className="normal-btn">Add</Button>
      </Flex>
      <div className="task-section">
      <h3>Todo</h3>

        <Row className="todo">
          <Col span={5}>
          <TaskComponent/>
          </Col>
        </Row>
        <Row className="in-progress">
          <h3>In progress</h3>
        </Row>

        <Row className="done">
          <h3>Done</h3>
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