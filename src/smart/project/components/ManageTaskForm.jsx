import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Button, Row, Col, Form, Input } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import TaskComponent from "./TaskComponent";

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

const ManageTaskForm = ({ title, date, priority, progress, form }) => {
  return (
    <StyledDiv className="manage-task-form ">
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

      <Form
        form={form}
        name="manage-task-form"
        labelCol={{ span: 24 }}
        // initialValues={initialValues}
        autoComplete="off"
      >
        <Form.Item
          label="Scope"
          name="scope"
          rules={[{ required: true, message: "Please input a scope!" }]}
        >
          <Input.TextArea disabled={isDisable} style={{ height: 150 }} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input a description!" }]}
        >
          <Input.TextArea disabled={isDisable} style={{ height: 150 }} />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.manage-task-form {
  }
`;

ManageTaskForm.propTypes = propTypes;
ManageTaskForm.defaultProps = defaultProps;
export default ManageTaskForm;
