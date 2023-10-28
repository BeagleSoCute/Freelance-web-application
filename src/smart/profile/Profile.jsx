import { useEffect, useState, useContext } from "react";
import { Row, Col, Form, Button } from "antd";
import styled from "styled-components";
import EditForm from "./components/EditForm";
import UploadImg from "components/image/UploadImg";
import DisplayPortfolio from "./components/DisplayPortfolio";
import { AppContext } from "contexts/app.context";
import { updateProfile } from "services/user.service";
import { notification } from "helpers/notification.helper";

const Profile = () => {
  const { user, setLoading } = useContext(AppContext);
  const [file, setFile] = useState(undefined);
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
    setLoading(true);
    const data = {
      inputData: form.getFieldsValue(),
      skills,
      image: file,
    };
    const { success } = await updateProfile(data);
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Update Profile Success" });
    } else {
      notification({
        type: "error",
        message: "Can not update profile, please contract admin!",
      });
    }
  };
  const editFormProps = {
    userData: user,
    skills: skills,
    form,
    onAddSkill: handleAddSkill,
    onRemoveSkill: handleRemoveSkill,
  };
  const uploadImgProps = {
    pictureURL: user.profile_picture,
    file: file,
    setFile: setFile ,
  };
  return (
    <StyledDiv className="profile-management">
      <h1>Profile Page </h1>
      <Row>
        <Col span={24}>
          <h2 className="title">Profile Management</h2>
          <UploadImg {...uploadImgProps} />
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
