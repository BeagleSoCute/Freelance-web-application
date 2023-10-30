import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Form, Input, message } from "antd";
import SkillTag from "components/skills/SkillTags";

const { TextArea } = Input;

const EditForm = ({ skills, onAddSkill, onRemoveSkill, userData, form }) => {
  const handleAddSkill = (value) => {
    const inputValue = value.trim();
    if (inputValue === "") {
      message.error("Please enter a skill that you want to add!");
      return;
    }
    const isDupSkill = skills.some(
      (skill) => skill.toLowerCase() === inputValue.toLowerCase()
    );
    if (!isDupSkill) {
      onAddSkill(inputValue);
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
    phoneNumber: userData.phone_number,
    description: userData.description,
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
            className="add-button"
            type="primary"
            onClick={() => handleAddSkill(form.getFieldValue("skill"))}
          >
            Add
          </Button>
        </div>
        <SkillTag items={skills} onRemoveSkill={onRemoveSkill} />
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.edit-form {
    margin: 0px auto;
    width: 50%;
  }
`;

export default EditForm;
