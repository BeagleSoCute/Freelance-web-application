import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input } from "antd";
import SkillTag from "components/skills/SkillTags";

const { TextArea } = Input;

const EditForm = ({ skills }) => {
  const onFinish = () => {};
  return (
    <StyledDiv className="edit-form">
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea />
        </Form.Item>

        <Form.Item label="Skills" name="skills">
          <Input />
        </Form.Item>

        <div className="add-skill-btn">
          <Button className="button" type="primary">
            Add
          </Button>
        </div>

        <SkillTag items={skills} />

        {/* <Form.Item className="button-submit-layout">
          <Button className="button-submit" type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item> */}
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.edit-form {
    width: 50%;
    margin: 0px auto;
    .add-skill-btn {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 25px;
      .button {
        width: 50%;
      }
    }
  }
`;

export default EditForm;
