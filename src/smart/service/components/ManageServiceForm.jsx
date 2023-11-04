import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Input, Select, message } from "antd";
import PropTypes from "prop-types";
import SkillTag from "components/skills/SkillTags";

const propTypes = {};

const defaultProps = {};

const ManageServiceForm = ({}) => {
  const [form] = Form.useForm();
  const onFinish = () => {};

  return (
    <StyledDiv>
      <Form
        form={form}
        name="manage-service-form"
        labelCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.manage-service-form {
  }
`;

ManageServiceForm.propTypes = propTypes;
ManageServiceForm.defaultProps = defaultProps;

export default ManageServiceForm;
