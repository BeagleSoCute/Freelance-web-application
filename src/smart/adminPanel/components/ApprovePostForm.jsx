import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Radio } from "antd";
import PropTypes from "prop-types";
const propTypes = {
  type: PropTypes.string,
  onChangeType: PropTypes.func,
};

const defaultProps = {
  type: "",
  onChangeType: "",
};

const ApprovePostForm = ({ type, onChangeType, form }) => {
  return (
    <StyledDiv className="approve-post-form">
      <Form
        form={form}
        name="approve-post-form"
        labelCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <div className="toggle-section">
          <h2>Approve or Reject the post</h2>
          <Radio.Group
            onChange={(e) => {
              onChangeType(e);
            }}
            defaultValue="approve"
            buttonStyle="solid"
          >
            <Radio.Button value="approve">Apprpve</Radio.Button>
            <Radio.Button value="reject">Reject</Radio.Button>
          </Radio.Group>
        </div>
        <Form.Item label="Reason" name="reason">
          <Input.TextArea disabled={type === "approve"} />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.approve-post-form {
    .toggle-section {
      margin-top: 25px;
    }
  }
`;

ApprovePostForm.propTypes = propTypes;
ApprovePostForm.defaultProps = defaultProps;

export default ApprovePostForm;
