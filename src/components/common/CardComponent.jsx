import React from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Card } from "antd";

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
const defaultProps = {
  title: "title",
  description: "description",
};
const { Meta } = Card;
const CardComponent = ({ title, description }) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[<EyeOutlined />, <EditOutlined key="edit" />, <DeleteOutlined />]}
  >
    <Meta
      // avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title={title}
      description={description}
    />
  </Card>
);

CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;
export default CardComponent;
