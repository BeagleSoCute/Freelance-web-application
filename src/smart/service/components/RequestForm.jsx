import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Radio } from "antd";
import PropTypes from "prop-types";
const propTypes = {
  type: PropTypes.string,
};

const defaultProps = {
  type: "",
};

const RequestForm = ({ type, form }) => {
  return (
    <StyledDiv className="request-form">
      <Form
        form={form}
        name="request-form"
        labelCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <h2>Send the request</h2>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.request-form {
      margin-top: 55px;
    
  }
`;

RequestForm.propTypes = propTypes;

RequestForm.defaultProps = defaultProps;

export default RequestForm;
