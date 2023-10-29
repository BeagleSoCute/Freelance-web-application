import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col, Form, Button } from "antd";
import UploadImg from "components/image/UploadImg";
import UpdatePortfolioForm from "./components/UpdatePortfolioForm";
import { AppContext } from "contexts/app.context";
import { updateProfile } from "services/user.service";
import { notification } from "helpers/notification.helper";

const UpdatePortfolio = () => {
  const { user, setLoading, setUser } = useContext(AppContext);
  const [file, setFile] = useState(undefined);
  const [skills, setSkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const init = () => {
      setSkillOptions(user.skills);
    };
    init();
  }, [user]);

  const handleAddSkill = (addedSkill) => {
    const newSkills = [...skills, addedSkill];
    const removeThisSkillOption = skillOptions.filter(
      (skill) => skill !== addedSkill
    );
    setSkills(newSkills);
    setSkillOptions(removeThisSkillOption);
  };
  const handleRemoveSkill = (removedSkill) => {
    const afterRemoveSkill = skills.filter((skill) => skill !== removedSkill);
    const addThisSkillOption = [...skillOptions, removedSkill];
    setSkills(afterRemoveSkill);
    setSkillOptions(addThisSkillOption);
  };
  const uploadImgProps = {
    // pictureURL: user.profile_picture,
    file: file,
    setFile: setFile,
  };
  const updatePortfolioForm = {
    form,
    skills: skills,
    skillOptions: skillOptions,
    onAddSkill: handleAddSkill,
    onRemoveSkill: handleRemoveSkill,
  };
  return (
    <StyledDiv className="update-portfolio">
      <h1>Add Portfolio</h1>
      <Row>
        <Col span={24}>
          <h2 className="title">Profile Management</h2>
          <UploadImg {...uploadImgProps} />
        </Col>
        <Col className="form-section" span={24}>
          <UpdatePortfolioForm {...updatePortfolioForm} />
        </Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.update-portfolio {
    .display-img {
      width: 650px;
      height: 400px;
    }
    .form-section {
      padding: 0px 150px;
    }
  }
`;
export default UpdatePortfolio;
