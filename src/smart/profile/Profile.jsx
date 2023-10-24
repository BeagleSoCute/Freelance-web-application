import { useEffect, useState, useContext } from "react";
import { Row, Col, Form, Button } from "antd";
import styled from "styled-components";
import EditForm from "./components/EditForm";
import UploadImg from "components/image/UploadImg";
import DisplayPortfolio from "./components/DisplayPortfolio";
import { AppContext } from "contexts/app.context";
import { updateProfile } from "services/user.service";

const Profile = () => {
  const { user } = useContext(AppContext);
  const [form] = Form.useForm();

  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const init = () => {
      setSkills(user.skills);
    };
    init();
  }, [user]);
  const handleAddSkill = (addedSkill) => {
    const newSkills = [...skills, addedSkill];
    setSkills(newSkills);
  };
  const handleRemoveSkill = (removedSkill) => {
    const afterRemoveSkill = skills.filter((skill) => skill !== removedSkill);
    setSkills(afterRemoveSkill);
  };
  const handleUpdateProfile = async () => {
    const data = {
      formData: form.getFieldsValue(),
      skills,
    };
    await updateProfile(data);
  };
  const editFormProps = {
    userData: user,
    skills: skills,
    form,
    onAddSkill: handleAddSkill,
    onRemoveSkill: handleRemoveSkill,
  };
  return (
    <StyledDiv className="profile-management">
      <h1>Profile Page </h1>
      <Row>
        <Col span={24}>
          <h2 className="title">Profile Management</h2>
          <UploadImg />
        </Col>
        <Col span={24} className="edit-form-section">
          <EditForm {...editFormProps} />
        </Col>
        <Col className="portfolio-section" span={24}>
          <DisplayPortfolio />
        </Col>
        <Col justify="center" className="update-button" span={24}>
          <Button onClick={() => handleUpdateProfile()}>Update Profile</Button>
        </Col>
      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.profile-management {
    .title {
      text-align: center;
      margin-bottom: 45px;
    }
    .edit-form-section {
      margin: 45px auto;
    }
    .portfolio-section .card-wrapper {
      margin: 25px 0px;
    }
    .update-button {
      display: flex;
      justify-content: center;
      button {
        width: 35%;
      }
    }
  }
`;

export default Profile;
