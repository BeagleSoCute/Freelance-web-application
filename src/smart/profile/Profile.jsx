import { useEffect, useState } from "react";
import { Row, Col, Flex, Button } from "antd";
import styled from "styled-components";
import EditForm from "./components/EditForm";
import UploadImg from "components/image/UploadImg";
import DisplayPortfolio from "./components/DisplayPortfolio";

const Profile = () => {
  const [skills, setSkills] = useState([
    "Java",
    "JavaScript",
    "React",
    "VueJS",
    "Css",
    "MongoDB",
    "NextJS",
    "ExpressJS",
    "NodeJS",
  ]);
  const handleAddSkill = (addedSkill) => {
    const newSkills = [...skills, addedSkill];
    setSkills(newSkills);
  };
  const handleRemoveSkill = (removedSkill) => {
    const afterRemoveSkill = skills.filter((skill) => skill !== removedSkill);
    setSkills(afterRemoveSkill);
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
          <EditForm
            skills={skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        </Col>
        <Col className="portfolio-section" span={24}>
          <DisplayPortfolio />
        </Col>
        <Col justify="center" className="update-button" span={24}>
          <Button>Update Profile</Button>
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
      button{
        width: 35%;

      }
    }
  }
`;

export default Profile;
