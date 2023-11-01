import React from "react";
import styled from "styled-components";
import CardComponent from "components/common/CardComponent";
import { Row, Col, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { truncateString } from "helpers/common.helper";
const propTypes = {
  portfolios: PropTypes.arrayOf(Object),
  viewPortfolio: PropTypes.func,
  selectPortfolio: PropTypes.func,
  onDelete: PropTypes.func,
  addPortfolio: PropTypes.func,
};
const defaultProps = {
  portfolios: [],
  viewPortfolio: () => {},
  selectPortfolio: () => {},
  onDelete: () => {},
  addPortfolio: () => {},
};

const DisplayPortfolio = ({
  portfolios,
  viewPortfolio,
  selectPortfolio,
  addPortfolio,
  onDelete,
}) => {
  const navigate = useNavigate();
  const handleAdd = () => {
    addPortfolio();
    navigate("/update-portfolio");
  };
  const handleView = (item) => {
    viewPortfolio(item);
    navigate("/view-portfolio");
  };
  const handleEdit = (item) => {
    selectPortfolio(item);
    navigate("/update-portfolio");
  };
  const handleDelete = (id) => {
    onDelete(id);
  };
  return (
    <StyledDiv className="display-portfolio">
      <h2>Portfolios</h2>
      <Flex className="btn-section" align="end" vertical>
        <Button className="add-btn" onClick={() => handleAdd()}>
          Add
        </Button>
      </Flex>
      <Flex justify="start" className="content-section" wrap="wrap" gap="large">
        {portfolios.map((item, index) => (
          <CardComponent
            key={index}
            portfolioImageURL={item.portfolio_picture}
            title={item.title}
            description={truncateString(item.description, 15)}
            onView={() => handleView(item)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
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
      margin: 50px auto;
    }
    .card-wrapper {
      /* margin:0px auto; */
    }
  }
`;

DisplayPortfolio.propTypes = propTypes;
DisplayPortfolio.defaultProps = defaultProps;

export default DisplayPortfolio;
