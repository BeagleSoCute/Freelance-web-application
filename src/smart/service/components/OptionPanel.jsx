import React, { Fragment } from "react";
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
  onSearch: PropTypes.func,
  isManage: PropTypes.bool,
  optionValue: PropTypes.object,
  onSelectType: PropTypes.func,
  onSelectOption: PropTypes.func,
};
const defaultProps = {
  categoryData: categoryDataMock,
  isManage: false,
  optionValue: { area: "", type: "", category: "" },
  onSearch: () => {},
  onSelectType: () => {},
  onSelectOption: () => {},
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

const OptionPanel = ({
  isManage,
  categoryData,
  onSearch,
  optionValue,
  onSelectOption,
  onChangeServiceType,
}) => {
  const navigate = useNavigate();
  return (
    <StyledDiv className="option-panel">
      <div className="toggle-section">
        <Radio.Group
          onChange={(value) => onChangeServiceType(value)}
          defaultValue="findService"
          buttonStyle="solid"
        >
          <Radio.Button value="findService">
            Looking for a freelancer
          </Radio.Button>
          <Radio.Button value="provideService">Provide a service</Radio.Button>
        </Radio.Group>
      </div>
      <div className="panel-wrapper">
        <div>
          <StyledSelect
            value={optionValue.type}
            className="select-option"
            placeholder="Select type"
            options={typeOptions}
            onChange={(value) => onSelectOption("type", value)}
          />
          <StyledSelect
            value={optionValue.area}
            showSearch
            className="select-option"
            placeholder="Select Area"
            options={areaOptions}
            onChange={(value) => onSelectOption("area", value)}
          />
          <StyledSelect
            value={optionValue.category}
            className="select-option"
            placeholder="Select Category"
            options={categoryOptions(categoryData)}
            onChange={(value) => onSelectOption("category", value)}
          />
          {isManage ? (
            ""
          ) : (
            <Fragment>
              <Button className="clear-button">Clear</Button>
              <Button type="primary">Search</Button>
            </Fragment>
          )}
        </div>
        {isManage ? (
          ""
        ) : (
          <div>
            <Button onClick={() => navigate("/manage-service")}>Add</Button>
          </div>
        )}
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
    width: 150px;
    margin-right: 20px;
  }
`;

OptionPanel.propTypes = propTypes;
OptionPanel.defaultProps = defaultProps;
export default OptionPanel;
