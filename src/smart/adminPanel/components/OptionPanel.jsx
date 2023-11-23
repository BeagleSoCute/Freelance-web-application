import React from "react";
import { Radio } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  onChangeOption: PropTypes.func,
};
const defaultProps = {
  onChangeOption: () => {},
};

const OptionPanel = ({ onChangeOption }) => {
  return (
    <StyledDiv className="admin-option-panel">
      <Radio.Group
        onChange={(value) => onChangeOption(value)}
        defaultValue="seeUsers"
        buttonStyle="solid"
      >
        <Radio.Button value="seeUsers">See all users</Radio.Button>
        <Radio.Button value="approveServices">Approve Services</Radio.Button>
        <Radio.Button value="seeRequest">See Requests</Radio.Button>
        <Radio.Button value="seeTransaction">See Transaction</Radio.Button>


      </Radio.Group>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.admin-option-panel {
    /* width: 150px;
    margin-right: 20px; */
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }
`;

OptionPanel.propTypes = propTypes;
OptionPanel.defaultProps = defaultProps;

export default OptionPanel;
