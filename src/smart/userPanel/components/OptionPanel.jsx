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
    <StyledDiv className="user-option-panel">
      <Radio.Group
        onChange={(value) => onChangeOption(value)}
        defaultValue="findService"
        buttonStyle="solid"
      >
        <Radio.Button value="findService">
          See my finding service post
        </Radio.Button>
        <Radio.Button value="provideService">
          See my providing service post
        </Radio.Button>
        <Radio.Button value="requestService">See my requests</Radio.Button>
        <Radio.Button value="approveServicesa">See my projects</Radio.Button>
      </Radio.Group>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.user-option-panel {
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
