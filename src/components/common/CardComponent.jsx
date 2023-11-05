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
  isView: PropTypes.bool,
  isShowAction: PropTypes.bool,
  isDeleteOnly: PropTypes.bool,
  noImage: PropTypes.bool,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
const defaultProps = {
  portfolioImageURL: "",
  title: "",
  description: "",
  isView: false,
  noImage: false,
  isShowAction: true,
  isDeleteOnly:false,
  onView: () => {},
  onEdit: () => {},
  onDelete: () => {},
};
const { Meta } = Card;
const CardComponent = ({
  portfolioImageURL,
  title,
  description,
  isView,
  noImage,
  isShowAction,
  isDeleteOnly,
  onView,
  onEdit,
  onDelete,
}) => {
  const renderAction = () => {
    if (!isShowAction) {
      return;
    }
    const viewAction = (
      <EyeOutlined
        onClick={() => {
          onView();
        }}
      />
    );
    const editAction = (
      <EditOutlined
        onClick={() => {
          onEdit();
        }}
        key="edit"
      />
    );
    const deleteAction = (
      <DeleteOutlined
        onClick={() => {
          onDelete();
        }}
      />
    );
    if (isView) {
      return [viewAction];
    } else if(isDeleteOnly){
      return [deleteAction]
    }
    else {
      return [viewAction, editAction, deleteAction];
    }
  };
  return (
    <StyledCard
      bordered={true}
      hoverable={true}
      className="card-component"
      style={{
        width: 300,
      }}
      cover={
        !noImage && (
          <img
            className="card-img"
            alt="example"
            src={portfolioImageURL ? portfolioImageURL : emptyImg}
          />
        )
      }
      actions={renderAction()}
    >
      <Meta title={title} description={description} />
    </StyledCard>
  );
};
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
