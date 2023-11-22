import React, {useEffect} from "react";
import styled from "styled-components";
import { Flex, Form, Input, InputNumber, DatePicker, Button } from "antd";
import PropTypes from "prop-types";
import { parseFormattedDate } from "helpers/date.helper";
import { useNavigate, useParams } from "react-router-dom";
const propTypes = {
  data: PropTypes.object,
  isDisable: PropTypes.bool,
};

const defaultProps = {
  data: {},
  isDisable: false,
};

const RequirementForm = ({ data, isDisable , form }) => {
  const navigate = useNavigate();
  const {projectID} = useParams();
  const initialValues = {
    expectation: data?.expectation,
    requirement: data?.requirement,
    budget: data?.budget,
    scope: data?.scope,
    dueDate: [
      parseFormattedDate(data?.startDate),
      parseFormattedDate(data?.endDate),
    ],
  };

  useEffect(() => {
    form.setFieldsValue(initialValues)

  },[initialValues])

  return (
    <StyledDiv className="requirement-form ">
      <Flex justify="space-between">
        <div></div>
        <h1>{data?.title}</h1>
        <div>
        {data?.isPaid ? <Button onClick={() => navigate(`/project/${projectID}`)}>Back to your project</Button>:''}
        </div>
      </Flex>
      <Form
        form={form}
        name="manage-service-form"
        labelCol={{ span: 24 }}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Flex>
          <Form.Item
            label="Due date"
            name="dueDate"
            rules={[{ required: true, message: "Please select the due date!" }]}
          >
            <DatePicker.RangePicker disabled={isDisable} />
          </Form.Item>
          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, message: "Please input your budget!" }]}
          >
            <InputNumber disabled={isDisable} />
          </Form.Item>
        </Flex>
        <Form.Item
          label="Requirement"
          name="requirement"
          rules={[
            { required: true, message: "Please input your requirement!" },
          ]}
        >
          <Input.TextArea disabled={isDisable} style={{ height: 150 }} />
        </Form.Item>
        <Form.Item
          label="Expectation"
          name="expectation"
          rules={[
            { required: true, message: "Please input your expectation!" },
          ]}
        >
          <Input.TextArea disabled={isDisable} style={{ height: 150 }} />
        </Form.Item>
        <Form.Item
          label="Scope"
          name="scope"
          rules={[{ required: true, message: "Please input your scope!" }]}
        >
          <Input.TextArea disabled={isDisable} style={{ height: 150 }} />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.requirement-form {
  }
`;

RequirementForm.propTypes = propTypes;
RequirementForm.defaultProps = defaultProps;
export default RequirementForm;
