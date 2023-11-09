import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, Select, message } from "antd";
import PropTypes from "prop-types";
import { useForm } from "antd/es/form/Form";
const propTypes = {
  onFinish: PropTypes.func,
};

const defaultProps = {
  onFinish: () => {},
};

const ApprovePostForm = ({ onFinish }) => {
  const [form] = Form.useForm();
  return (
    <StyledDiv className="approve-post-form">
      <Form
        form={form}
        name="approve-post-form"
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
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.approve-post-form {
  }
`;

ApprovePostForm.propTypes = propTypes;
ApprovePostForm.defaultProps = defaultProps;

export default ApprovePostForm;
