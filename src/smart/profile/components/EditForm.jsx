import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input, message } from "antd";
import SkillTag from "components/skills/SkillTags";

const { TextArea } = Input;

const EditForm = ({ skills, onAddSkill, onRemoveSkill, userData }) => {
  const [form] = Form.useForm();
  const handleAddSkill = (value) => {
    if (value === "") {
      message.error("Please enter a skill that you want to add!");
    }
    const isDupSkill = skills.some(
      (skill) => skill.toLowerCase() === value.toLowerCase()
    );
    if (!isDupSkill) {
      onAddSkill(value);
    } else {
      message.error(
        "You already have this skill, please add another one instead!"
      );
    }
    form.setFieldValue("skill", "");
  };

  const onFinish = () => {};

  const initialValues = {
    firstName: userData.first_name,
    lastName: userData.last_name,
    phoneNumber: userData.phone_number
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [userData]);

  return (
    <StyledDiv className="edit-form">
      <Form
        form={form}
        name="edit-for"
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

        <Form.Item label="Skills" name="skill">
          <Input />
        </Form.Item>

        <div className="add-skill-btn">
          <Button
            className="button"
            type="primary"
            onClick={() => handleAddSkill(form.getFieldValue("skill"))}
          >
            Add
          </Button>
        </div>

        <SkillTag items={skills} onRemoveSkill={onRemoveSkill} />

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
