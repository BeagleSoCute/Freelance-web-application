import React, { useEffect } from "react";
import styled from "styled-components";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
const propTypes = {
  type: PropTypes.string,
  requestInfo: PropTypes.object,
};

const defaultProps = {
  type: "",
  requestInfo: undefined,
};

const RequestForm = ({ requestInfo, form }) => {
  const initialValues = {
    description: requestInfo?.description,
  };

  useEffect(() => {
    if (requestInfo) {
      form.setFieldsValue(initialValues);
    }
  }, [requestInfo]);

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
        <p><span className="bold-text">Status:</span> {requestInfo?.status}</p>
        <Form.Item label="Description" name="description">
          <Input.TextArea disabled={requestInfo ? true : false} />
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
