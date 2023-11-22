import { useEffect, useContext, useState } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col } from "antd";
import styled from "styled-components";
import UserInfoSection from "./components/UserInfoSection";
import { useNavigate, useParams } from "react-router-dom";
import DisplayPortfolio from "components/portfolio/DisplayPortfolio";
import ContentLayout from "layouts/ContentLayout";
import FeedbackSection from "./components/FeedbackSection";
// import ServiceSection from "./components/ServiceSection";
import DisplayFeedback from "./components/DisplayFeedback";
import { getUserDetails } from "services/user.service";

const OtherProfileDetails = () => {
  const { setLoading, viewPortfolio, selectPortfolio } = useContext(AppContext);
  const navigate = useNavigate();
  const { userID } = useParams();
  const [displayFeedbackList, setDisplayFeedbackList] = useState(undefined);
  const [user, setUser] = useState();
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { payload } = await getUserDetails(userID);
      console.log("payload", payload);
      setLoading(false);
      setUser(payload);
    };
    init();
  }, []);

  const displayPortfolioProps = {
    portfolios: user?.portfolios,
    isViewOnly:true,
    isHideAddBtn:true,
    viewPortfolio,
    selectPortfolio,
  };
  const handleSelectFeedback = (value) => {
    setDisplayFeedbackList(value);
  };
  return (
    <StyledDiv className="profile">
      <ContentLayout>
        <Row justify="space-between">
          <h1>Profile Page </h1>
        </Row>

        <Row className="profile-section">
          <Col className="user-data-section" span={24}>
            <UserInfoSection userData={user} />
          </Col>
          {displayFeedbackList ? (
            <Col span={24}>
              <DisplayFeedback
                feedbackList={displayFeedbackList}
                onBack={() => {
                  setDisplayFeedbackList(undefined);
                }}
              />
            </Col>
          ) : (
            <>
              <Col className="feedback-section" span={24}>
                <h2>Feedback</h2>
                <FeedbackSection
                  onSelect={(value) => handleSelectFeedback(value)}
                  seekerFeedback={user?.seeker_feedbacks}
                  freelancerFeedback={user?.freelancer_feedbacks}
                />
              </Col>
              <Col className="portfolio-section" span={24}>
                <DisplayPortfolio {...displayPortfolioProps} />
              </Col>
            </>
          )}
        </Row>
      </ContentLayout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.other-profile-detail {
    width: 100%;
    .profile-section {
      margin: 50px 0px;
    }

    .edit-button {
      margin: auto 0px;
      width: 150px;
    }
  }
`;

export default OtherProfileDetails;
