import React from "react";
import styled from "styled-components";
import CardComponent from "components/common/CardComponent";
import { Row, Col, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";


const DisplayPortfolio = () => {
  const navigate = useNavigate();
  return (
    <StyledDiv className="display-portfolio">
      <h2>Portfolios</h2>
      <Flex className="btn-section" align="end" vertical>
        <Button
          className="add-btn"
          onClick={() => navigate("/update-portfolio")}
        >
          Add{" "}
        </Button>
      </Flex>
      <Flex className="content-section" wrap="wrap" gap="large">
        <CardComponent title="test" description="des" />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </Flex>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  &.display-portfolio {
    button.add-btn {
      width: 150px;
    }
    .content-section {
      margin: 50px 0px;
    }
  }
`;

export default DisplayPortfolio;
