import { useEffect } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import EditForm from "./components/EditForm";

import UploadImg from "components/image/UploadImg";

const Profile = () => {
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
          <EditForm />
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
