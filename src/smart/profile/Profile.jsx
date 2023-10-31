import { useEffect, useState, useContext } from "react";
import { Row, Col, Form, Button } from "antd";
import styled from "styled-components";
import EditForm from "./components/EditForm";
import UploadImg from "components/image/UploadImg";
import DisplayPortfolio from "../../components/portfolio/DisplayPortfolio";
import { AppContext } from "contexts/app.context";
import { updateProfile, deletePortfolio } from "services/user.service";
import { notification } from "helpers/notification.helper";

const Profile = () => {
  const { user, setLoading, setUser, selectPortfolio } = useContext(AppContext);
  const [file, setFile] = useState(undefined);
  const [skills, setSkills] = useState([]);
  const [form] = Form.useForm();
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
    const { success, payload } = await updateProfile(data);
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Update Profile Success" });
      setUser(payload);
    } else {
      notification({
        type: "error",
        message: "Can not update profile, please contract admin!",
      });
    }
  };

  const handleDeletePortfolio = async (id) => {
    setLoading(true);
    const { success, payload } = await deletePortfolio(id);
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Delete Portfolio Success" });
      setUser(payload);
    } else {
      notification({
        type: "error",
        message: "Can not delete portfolio, please contract admin!",
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
    isProfile: true,
    setFile: setFile,
  };
  const displayPortfolioProps = {
    portfolios: user.portfolios,
    selectPortfolio,
    onDelete: handleDeletePortfolio,
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
          <DisplayPortfolio {...displayPortfolioProps} />
        </Col>
        <Col justify="center" className="submit-button-section" span={24}>
          <Button
            className="submit-button"
            onClick={() => handleUpdateProfile()}
          >
            Update Profile
          </Button>
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
    .portfolio-section {
      padding: 0px 50px;
    }
    .portfolio-section .card-wrapper {
      display: flex;
      justify-content: center;
      margin: 25px auto;
    }
  }
`;

export default Profile;
