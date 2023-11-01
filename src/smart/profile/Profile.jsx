import { useEffect, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
import UserInfoSection from "./components/UserInfoSection";
import { useNavigate } from "react-router-dom";
import DisplayPortfolio from "components/portfolio/DisplayPortfolio";
import { deletePortfolio } from "services/user.service";
import { notification } from "helpers/notification.helper";
import ContentLayout from "layouts/ContentLayout";

const Profile = () => {
  const { user, setLoading, setUser, viewPortfolio, addPortfolio, selectPortfolio } =
    useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {}, []);

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

  const displayPortfolioProps = {
    portfolios: user.portfolios,
    viewPortfolio,
    selectPortfolio,
    addPortfolio,
    onDelete: handleDeletePortfolio,
  };
  return (
    <StyledDiv className="profile">
              <ContentLayout>

        <Row justify="space-between">
          <h1>Profile Page </h1>
          <Button
            className="edit-button"
            onClick={() => navigate("/profile-management")}
          >
            Edit
          </Button>
        </Row>

        <Row className="profile-section">
          <Col className="user-data-section" span={24}>
            <UserInfoSection userData={user} />
          </Col>
          <Col className="portfolio-section" span={24}>
            <DisplayPortfolio {...displayPortfolioProps} />
          </Col>
        </Row>
      </ContentLayout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.profile {
    width: 100%;
    .profile-section {
      margin: 50px 0px;
    }
    .title {
      text-align: center;
      margin-bottom: 45px;
    }
    .edit-button {
      margin: auto 0px;
      width: 150px;
    }
    .portfolio-section {
      padding: 0px 50px;
    }
  }
`;

export default Profile;
