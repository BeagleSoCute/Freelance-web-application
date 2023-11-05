import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Input, Select, message } from "antd";
import PropTypes from "prop-types";
import SkillTag from "components/skills/SkillTags";
import AddData from "components/select/AddData";

const propTypes = {
  serviceType: PropTypes.string,
  portfolios: PropTypes.array,
  onAddPortfolio: PropTypes.func,
};

const defaultProps = {
  serviceType: "findService",
  portfolios: [],
  isManage: false,
  onAddPortfolio: () => {},
};

const transformPortfolioOptions = (data) => {
  return data.map((item) => {
    return {
      label: item.title,
      value: item._id,
    };
  });
};

const ManageServiceForm = ({
  serviceType,
  portfolios,
  onAddPortfolio,
  form,
}) => {
  const isFindService = serviceType === "findService";
  const onFinish = () => {};
  const handleAddPortfolio = () => {
    onAddPortfolio(form.getFieldValue("relatedPortfolio"))
    form.setFieldValue("relatedPortfolio", "");
  }

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
          label={isFindService ? "Requirement" : "Service description"}
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        {isFindService ? (
          ""
        ) : (
          <>
          <Form.Item label={"Select related portfolio"} name="relatedPortfolio">
            <Select
              className="select-component"
              options={transformPortfolioOptions(portfolios)}
            />
         
          </Form.Item>
          <Button
              className="button"
              onClick={() =>
                handleAddPortfolio()
              }
            >
              Add
            </Button>
            </>
        )}
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
