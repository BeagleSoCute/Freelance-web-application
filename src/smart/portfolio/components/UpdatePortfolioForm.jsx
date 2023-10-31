import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Input, Select, message } from "antd";
import PropTypes from "prop-types";
import SkillTag from "components/skills/SkillTags";

const propTypes = {
  skills: PropTypes.array,
  skillOptions: PropTypes.array,
  isEditPortfolio: PropTypes.bool,
  portfolioData: PropTypes.obj,
  onAddSkill: PropTypes.func,
  onRemoveSkill: PropTypes.func,
};
const defaultProps = {
  skills: [],
  portfolioData: {},
  skillOptions: [],
  isEditPortfolio: false,
  onAddSkill: () => {},
  onRemoveSkill: () => {},
};

const UpdatePortfolioForm = ({
  form,
  skills,
  skillOptions,
  portfolioData,
  isEditPortfolio,
  onAddSkill,
  onRemoveSkill,
}) => {
  const initialValues = {
    title: portfolioData.title,
    description: portfolioData.description,
  };
  useEffect(() => {
    const init = () => {
      if (isEditPortfolio) {
        form.setFieldsValue(initialValues);
      }
      init();
    };
  }, [portfolioData]);

  const onFinish = () => {};
  const handleAddSkill = (value) => {
    if (!value) {
      message.error("Please select a skill!");
      return;
    }
    onAddSkill(value);
    form.setFieldValue("skill", "");
  };
  const handleRemoveSkill = (value) => {
    onRemoveSkill(value);
  };
  const handleSelect = () => {};
  const options = skillOptions.map((skill) => {
    return {
      value: skill,
      label: skill,
    };
  });
  return (
    <StyledDiv className="update-portfolio-form ">
      <Form
        form={form}
        name="edit-for"
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
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Skills related to this work (The system shows your skills added on the profile management page) "
          name="skill"
        >
          <Select
            placeholder="Select a skill"
            optionFilterProp="children"
            options={options}
            onChange={handleSelect}
          />
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
        <SkillTag items={skills} onRemoveSkill={handleRemoveSkill} />
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.update-portfolio-form {
    width: 50%;
    margin: 0px auto;
    .add-skill-btn {
      margin-bottom: 25px;
    }
  }
`;

UpdatePortfolioForm.propTypes = propTypes;
UpdatePortfolioForm.defaultProps = defaultProps;

export default UpdatePortfolioForm;
