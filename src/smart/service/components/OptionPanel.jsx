import React from "react";
import { Row, Col, Select, Button, Radio } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import nzData from "assets/data/nzData.json";
import { useNavigate } from "react-router-dom";

const categoryDataMock = [
  { name: "Web Development" },
  { name: "Cleaning" },
  { name: "Tutor" },
  { name: "Dog walking" },
];

const propTypes = {
  categoryData: PropTypes.array,
  onSearch: PropTypes.string,
};
const defaultProps = {
  categoryData: categoryDataMock,
  onSearch: () => {},
};
const typeOptions = [
  {
    label: "Onsite",
    value: "Onsite",
  },
  {
    label: "Remote working",
    value: "Remote working",
  },
];
const areaOptions = nzData.map((item) => {
  return {
    label: item.city,
    value: item.city,
  };
});
const categoryOptions = (data) => {
  return data.map((item) => {
    return {
      label: item?.name,
      value: item?.name,
    };
  });
};

const OptionPanel = ({ categoryData, onSearch }) => {
  const navigate = useNavigate();
  return (
    <StyledDiv className="option-panel">
      <div className="toggle-section">
        <Radio.Group defaultValue="findService" buttonStyle="solid">
          <Radio.Button value="findService">
            Looking for a freelancer
          </Radio.Button>
          <Radio.Button value="findWork">Looking for a seeker</Radio.Button>
        </Radio.Group>
      </div>
      <div className="panel-wrapper">
        <div>
          <StyledSelect
            className="select-option"
            placeholder="Select type"
            options={typeOptions}
            onChange={() => onSearch}
          />
          <StyledSelect
            showSearch
            className="select-option"
            placeholder="Select Area"
            options={areaOptions}
            onChange={() => onSearch}
          />
          <StyledSelect
            className="select-option"
            placeholder="Select Category"
            options={categoryOptions(categoryData)}
            onChange={() => onSearch}
          />
          <Button className="clear-button">Clear</Button>
          <Button type="primary">Search</Button>
        </div>
        <div>
          <Button onClick={() => navigate("/manage-service")}>Add</Button>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.option-panel {
    .panel-wrapper {
      display: flex;
      justify-content: space-between;
    }
    .toggle-section {
      display: flex;
      justify-content: center;
    }
    .panel-wrapper,
    .toggle-section {
      margin-bottom: 20px;
    }
    .clear-button {
      margin-right: 10px;
    }
  }
`;

const StyledSelect = styled(Select)`
  &.select-option {
    width: 200px;
    margin-right: 20px;
  }
`;

OptionPanel.propTypes = propTypes;
OptionPanel.defaultProps = defaultProps;
export default OptionPanel;
