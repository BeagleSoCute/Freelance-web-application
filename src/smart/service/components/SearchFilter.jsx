import React from "react";
import { Row, Col, Select, Button, Radio } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import nzData from "assets/data/nzData.json";

const propTypes = {
  categoryData: PropTypes.array,
  onSearch: PropTypes.string,
};
const defaultProps = {
  categoryData: [],
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

const SearchFilter = ({ categoryData, onSearch }) => {
  return (
    <StyledDiv className="search-filter">
      <div className="toggle-section">
        <Radio.Group defaultValue="findService" buttonStyle="solid">
          <Radio.Button value="findService">Find Services</Radio.Button>
          <Radio.Button value="findWork">Find Works</Radio.Button>
        </Radio.Group>
      </div>
      <div className="search-filder-section">
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
          <Button type="primary">Search</Button>
        </div>
        <div>
          <Button>Add</Button>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.search-filter {
    .search-filder-section {
      display: flex;
      justify-content: space-between;
    }
    .toggle-section {
      display: flex;
      justify-content: center;
    }
    .search-filder-section,
    .toggle-section {
      margin-bottom: 20px;
    }
  }
`;

const StyledSelect = styled(Select)`
  &.select-option {
    width: 200px;
    margin-right: 20px;
  }
`;

SearchFilter.propTypes = propTypes;
SearchFilter.defaultProps = defaultProps;
export default SearchFilter;
