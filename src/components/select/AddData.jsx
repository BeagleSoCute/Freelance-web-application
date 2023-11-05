import React from "react";
import { Select, Button, Row, Col } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
};

const defaultProps = {
  title: "",
  options: [],
  onClick: () => {},
};

const AddData = ({ title, options, onClick }) => {
  return (
    <StyledDiv gutter={[0, 20]} className="add-data">
      <p>{title}</p>
      <Select className="select-component" options={options} />
      <Button className="button" onClick={() => onClick()}>
        Add
      </Button>
    </StyledDiv>
  );
};

const StyledDiv = styled(Row)`
  &.add-data {
    .select-component {
      margin-right: 10px;
      width: 250px;
    }
  }
`;

AddData.propTypes = propTypes;
AddData.defaultProps = defaultProps;
export default AddData;
