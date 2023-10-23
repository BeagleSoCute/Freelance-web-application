import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import EditForm from "./components/EditForm";
import SkillTag from "components/skills/SkillTags";

import UploadImg from "components/image/UploadImg";

const Profile = () => {
  const [skills, setSkilss] = useState([
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
  useEffect(() => {}, []);
  return (
    <StyledDiv className="profile-management">
      <h1>Profile Page </h1>
      <Row>
        <Col span={24}>
          <h2 className="title">Profile Management</h2>
          <UploadImg />
        </Col>
        <Col span={24} className="edit-form-section">
          <EditForm skills={skills} />
        </Col>
        <Col span={24}>
          <h2>Skills</h2>
          {/* <SkillTag items={skills} /> */}
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
  }
`;

export default Profile;
