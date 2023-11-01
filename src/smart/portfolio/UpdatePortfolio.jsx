import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col, Form, Button } from "antd";
import UploadImg from "components/image/UploadImg";
import UpdatePortfolioForm from "./components/UpdatePortfolioForm";
import { AppContext } from "contexts/app.context";
import { addPortfolio, editPortfolio } from "services/user.service";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";
import ContentLayout from "layouts/ContentLayout";

const UpdatePortfolio = () => {
  const {
    user,
    setLoading,
    setUser,
    portfolio,
    isEditPortfolio,
    isAddPortfolio,
    clearPortfolio,
  } = useContext(AppContext);
  const [file, setFile] = useState(undefined);
  const [skills, setSkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const initialValues = {
    title: portfolio?.title,
    description: portfolio?.description,
  };
  useEffect(() => {
    const init = () => {
      if (!isEditPortfolio && !isAddPortfolio) {
        navigate("/profile");
      }
      setSkillOptions(user.skills);
      if (isEditPortfolio) {
        setSkills(portfolio.skills);
        const removeDupSkill = user.skills.filter(
          (skill) => !portfolio.skills.includes(skill)
        );
        setSkillOptions(removeDupSkill);
        form.setFieldsValue(initialValues);
      }
    };
    init();
    return () => {
      clearPortfolio();
    };
  }, [user]);

  const handleAddPortfolio = async () => {
    setLoading(true);
    const data = {
      inputData: form.getFieldsValue(),
      skills,
      image: file,
    };
    const { success, payload } = await addPortfolio(data);
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Add Portfolio Success" });
      setUser(payload);
      navigate("/profile");
    } else {
      notification({
        type: "error",
        message: "Can not add portfolio, please contract admin!",
      });
    }
  };

  const handleEditPortfolio = async () => {
    setLoading(true);
    const data = {
      inputData: form.getFieldsValue(),
      skills,
      image: file,
      originalImage: portfolio.portfolio_picture,
      portfolioId: portfolio._id,
    };
    const { success, payload } = await editPortfolio(data);
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Update Portfolio Success" });
      setUser(payload);
      navigate("/profile");
    } else {
      notification({
        type: "error",
        message: "Can not update portfolio, please contract admin!",
      });
    }
  };
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
    pictureURL: portfolio?.portfolio_picture,
    file: file,
    setFile: setFile,
  };
  const updatePortfolioForm = {
    form,
    skills: skills,
    skillOptions: skillOptions,
    isEditPortfolio: isEditPortfolio,
    portfolioData: portfolio,
    onAddSkill: handleAddSkill,
    onRemoveSkill: handleRemoveSkill,
  };
  return (
    <StyledDiv className="update-portfolio">
      <ContentLayout>
        <h1>{isEditPortfolio ? "Edit" : "Add"} Portfolio</h1>
        <Row>
          <Col span={24}>
            <UploadImg {...uploadImgProps} />
          </Col>
          <Col className="form-section" span={24}>
            <UpdatePortfolioForm {...updatePortfolioForm} />
          </Col>

          <Col justify="center" className="submit-button-section" span={24}>
            <Button
              onClick={() => navigate("/profile")}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button
              className="submit-button"
              type="primary"
              onClick={() => {
                isEditPortfolio ? handleEditPortfolio() : handleAddPortfolio();
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </ContentLayout>
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
