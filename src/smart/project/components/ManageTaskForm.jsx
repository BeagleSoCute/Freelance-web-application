import React, { useEffect, useState, useRef } from "react";
import { Flex, Button, Row, Col, Form, Input, Checkbox, Select } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { randomString } from "helpers/common.helper";
import CheckListComponent from "./ChecklistComponent";
import { getCurrentDate } from "helpers/date.helper";
import { transformCheckList } from "../helpers/index";

const propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  priority: PropTypes.string,
  progress: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  title: "title",
  date: "date",
  priority: "high",
  progress: "progress",
  onClose: () => {},
  onSubmit: () => {},
};

const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const progressOptions = [
  { label: "Todo", value: "todo" },
  { label: "In-progress", value: "inProgress" },
  { label: "Done", value: "done" },
];

const ManageTaskForm = ({
  title,
  date,
  priority,
  progress,
  viewTaskData,
  onClose,
  onSubmit,
  onEdit,
}) => {
  const [form] = Form.useForm();
  const [checkList, setCheckList] = useState(
    viewTaskData ? transformCheckList(viewTaskData?.checkList) : []
  );
  const [selectProgress, setSelectProgress] = useState(viewTaskData?.progress);
  const [selectPriority, setSelectPriority] = useState(viewTaskData?.priority);
  const [inputCheckDes, setInputChecDes] = useState("");
  const [inputTitle, setInputTitle] = useState(viewTaskData?.title);
  const handleSetCheckList = () => {
    const data = {
      id: randomString(),
      description: inputCheckDes,
      isDone: false,
    };
    setCheckList([...checkList, data]);
    setInputChecDes("");
  };
  const handleRemove = (id) => {
    const afterRemoved = checkList.filter((item) => item.id !== id);
    setCheckList(afterRemoved);
  };
  const handleCheck = (id, value) => {
    const afterEdited = checkList.map((item) =>
      item.id === id ? { ...item, isDone: value } : item
    );
    setCheckList(afterEdited);
  };
  const handleSubmit = () => {
    const data = {
      title: inputTitle,
      priority: selectPriority,
      progress: selectProgress,
      description: form.getFieldValue("description"),
      scope: form.getFieldValue("scope"),
      checkList,
      date: getCurrentDate(),
    };
    const editData = {
      ...data,
      id: viewTaskData?._id,
    };
    if (viewTaskData) {
      onEdit(editData);
    } else {
      onSubmit(data);
    }
  };

  return (
    <StyledDiv className="manage-task-form ">
      <Flex justify="space-between">
        <div>
          <span className="bold-text">Add title:</span>
          <Input
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>
        <div>{date}</div>
      </Flex>
      <p>
        <span className="bold-text">Priority:</span>
        <Select
          value={selectPriority}
          onSelect={(value) => setSelectPriority(value)}
          className="normal-select"
          options={priorityOptions}
        />
      </p>
      <p>
        <span className="bold-text">Progress:</span>
        <Select
          value={selectProgress}
          onSelect={(value) => setSelectProgress(value)}
          className="normal-select"
          options={progressOptions}
        />
      </p>

      <Form
        form={form}
        name="manage-task-form"
        labelCol={{ span: 24 }}
        initialValues={{
          scope: viewTaskData?.scope,
          description: viewTaskData?.description,
        }}
        autoComplete="off"
      >
        <Form.Item label="Scope" name="scope">
          <Input.TextArea style={{ height: 150 }} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea style={{ height: 150 }} />
        </Form.Item>
      </Form>

      <div className="progress-section">
        <Flex justify="space-between">
          <h2 className="bold-text progress-title">Progress</h2>
        </Flex>
        <div>
          <p>Add progress</p>
          <Input
            value={inputCheckDes}
            onChange={(e) => setInputChecDes(e.target.value)}
          />
          <Button
            onClick={() => handleSetCheckList()}
            className="normal-btn add-progress"
          >
            Add
          </Button>
        </div>
        <div className="diplay checklist">
          {checkList.map((item, index) => (
            <CheckListComponent
              key={index}
              id={item._id ? item._id : item.id}
              isCheck={item?.isDone}
              description={item?.description}
              onCheck={handleCheck}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
      <Flex justify="center" gap="middle">
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" onClick={() => handleSubmit()}>
          Confirm
        </Button>
      </Flex>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.manage-task-form {
    .progress-section {
      padding: 20px;
    }
    .add-progress {
      margin-top: 20px;
    }
  }
`;

ManageTaskForm.propTypes = propTypes;
ManageTaskForm.defaultProps = defaultProps;
export default ManageTaskForm;
