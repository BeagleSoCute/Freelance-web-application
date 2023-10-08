import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";

const propTypes = {
  onFinish: PropTypes.func,
};
const defaultProps = {
  onFinish: () => {},
};

const validatorConfirmPassword = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("Password and confirm password do not match");
  },
});
const validatePassword = (_, value) => {
  if (value && value.length < 6) {
    return Promise.reject("Password must be at least 6 characters long.");
  } 
  else if (value && value.length > 20) {
    return Promise.reject("Password must no longer than 20.");
  }
  return Promise.resolve();
};

const validateName = (_, value) => {
  if (value && value.length < 3) {
    return Promise.reject("Name must be at least 3 characters long.");
  } else if (value && value.length > 50) {
    return Promise.reject("name must not exceed 50 characters long.");
  }
  return Promise.resolve();
};

const RegisterForm = ({ onFinish }) => {
  return (
    <div>
      <h1>Register</h1>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            { validator: validateName },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            validatorConfirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="button-submit-layout">
          <Button className="button-submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;
export default RegisterForm;
