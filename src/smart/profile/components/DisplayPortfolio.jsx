import React from "react";
import styled from "styled-components";
import CardComponent from "components/common/CardComponent";
import { Row, Col, Flex, Button } from "antd";

const DisplayPortfolio = () => {
  return (
    <StyledDiv>
      <h2>Portfolios</h2>
      <Flex align="end" vertical>
        <Button>Add </Button>
      </Flex>
      <Flex className="card-wrapper" wrap="wrap" gap="large">
        <CardComponent title='test' description="des" />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </Flex>
    </StyledDiv>
  );
};
const StyledDiv = styled.div``;

export default DisplayPortfolio;
