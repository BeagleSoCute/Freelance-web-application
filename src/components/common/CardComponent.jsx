import React from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Card } from "antd";
import emptyImg from "assets/img/emptyImg.jpg";
import styled from "styled-components";

const propTypes = {
  portfolioImageURL: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
const defaultProps = {
  portfolioImageURL: "",
  title: "title",
  description: "description",
  onEdit: () => {}, 
  onDelete: () => {},
};
const { Meta } = Card;
const CardComponent = ({ portfolioImageURL, title, description, onEdit, onDelete }) => (
  <StyledCard
    bordered={true}
    hoverable={true}
    className="card-component"
    style={{
      width: 300,
    }}
    cover={
      <img
        className="card-img"
        alt="example"
        src={portfolioImageURL ? portfolioImageURL : emptyImg}
      />
    }
    actions={[<EyeOutlined />, <EditOutlined key="edit" />, <DeleteOutlined />]}
  >
    <Meta
      title={title}
      description={description}
    />
  </StyledCard>
);
const StyledCard = styled(Card)`
  &.card-component {
    img {
      height: 250px;
      border: 1px solid #f0f0f0;
    }
  }
`;
CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;
export default CardComponent;
