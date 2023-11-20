import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Button, Row, Col, Input, Checkbox } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

const propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  onRemove: PropTypes.func,
  onCheck: PropTypes.func,
};

const defaultProps = {
  id: 0,
  description: "des...",
  onRemove: () => {},
  onCheck: () => {},
};

const CheckListComponent = ({ id, description, onCheck, onRemove }) => {
  return (
    <StyledDiv className="checklist-component">
      <Flex className="wrapper" justify="space-between">
        <Row>
          <Checkbox onChange={(e) => onCheck(id, e.target.checked)} />
          <p className="des">{description}</p>
        </Row>

        <div className="delete-section">
          <DeleteOutlined classID="delete-icon" onClick={() => onRemove(id)} />
        </div>
      </Flex>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.checklist-component {
    margin: 25px 0px;
    border: 1px solid black;
    padding: 0px 10px;
    .wrapper {
      height: 100%;
    }
    .des {
      margin-left: 10px;
    }
    .delete-section {
      font-size: 16px;
      margin: auto 0px;
    }
    .delete-icon {
      cursor: pointer;
    }
  }
`;

CheckListComponent.propTypes = propTypes;
CheckListComponent.defaultProps = defaultProps;
export default CheckListComponent;
