import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col, Divider } from "antd";
import SkillTag from "components/skills/SkillTags";
import { AppContext } from "contexts/app.context";
import { useNavigate } from "react-router-dom";
import emptyImg from "assets/img/emptyImg.jpg";
import ContentLayout from "layouts/ContentLayout";

const ShowPortfolioDetail = () => {
  const { portfolio, isViewPortfolio, clearPortfolio } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const init = () => {
      if (!isViewPortfolio) {
        navigate("/profile");
      }
    };
    init();
    return () => {
      clearPortfolio();
    };
  }, []);
  return (
    <StyledDiv className="show-portfolio-detail">
      <ContentLayout>
        <h1>Portfolio</h1>
        <Row className="portfolio-content-section">
          <Col className="img-section" span={24}>
            <img
              alt="portfolio-picture"
              src={
                portfolio?.portfolio_picture
                  ? portfolio.portfolio_picture
                  : emptyImg
              }
            />
          </Col>
          <div className="content-section">
            <Col span={24}>
              <p>
                <span className="bold-text">Title:</span> {portfolio?.title}
              </p>
            </Col>
            <Col span={24}>
              <p>
                <span className="bold-text">Description:</span>
                {portfolio?.description}
              </p>
            </Col>
            <Col span={24}>
              <p className="bold-text">Skills:</p>
              <SkillTag items={portfolio?.skills} />
            </Col>
          </div>
        </Row>
      </ContentLayout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.show-portfolio-detail {
    .img-section {
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
    }
    img {
      width: 350px;
      height: 350px;
    }
  }
`;

export default ShowPortfolioDetail;
