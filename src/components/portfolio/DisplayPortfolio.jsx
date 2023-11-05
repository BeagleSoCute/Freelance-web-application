import React from "react";
import styled from "styled-components";
import CardComponent from "components/common/CardComponent";
import { Row, Col, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { truncateString } from "helpers/common.helper";
const propTypes = {
  portfolios: PropTypes.arrayOf(Object),
  isShowAction: PropTypes.bool,
  isHideAddBtn: PropTypes.bool,
  title: PropTypes.string,
  viewPortfolio: PropTypes.func,
  selectPortfolio: PropTypes.func,
  onDelete: PropTypes.func,
  addPortfolio: PropTypes.func,
};
const defaultProps = {
  title: "Portfolios",
  portfolios: [],
  isShowAction: true,
  isHideAddBtn: false,
  viewPortfolio: () => {},
  selectPortfolio: () => {},
  onDelete: () => {},
  addPortfolio: () => {},
};

const DisplayPortfolio = ({
  title,
  portfolios,
  viewPortfolio,
  isShowAction,
  isHideAddBtn,
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
      <h2>{title}</h2>
      {!isHideAddBtn && (
        <Flex className="btn-section" align="end" vertical>
          <Button className="add-btn" onClick={() => handleAdd()}>
            Add
          </Button>
        </Flex>
      )}
      <Flex justify="start" className="content-section" wrap="wrap" gap="large">
        {portfolios.map((item, index) => (
          <CardComponent
            key={index}
            isShowAction={isShowAction}
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
