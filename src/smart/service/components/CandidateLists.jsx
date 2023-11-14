import { useState } from "react";
import styled from "styled-components";
import TableData from "components/common/TableData";
import { useNavigate } from "react-router-dom";
import { candidateColums } from "../table/tableColumn";
import { transformCandidateTableData } from "../helpers/table.helper.js";
import PropTypes from "prop-types";
const propTypes = {
  status: PropTypes.string,
  data: PropTypes.array,
  onSetSeeCandidate: PropTypes.func
};

const defaultProps = {
  status: '',
  data: [],
  onSetSeeCandidate: () => {}
};
const CandidateLists = ({status, data, onSetSeeCandidate}) => {
  const navigate = useNavigate();
  return (
    <StyledDiv className="candidate-list">
      <h2>Candidates</h2>
      <TableData
        columns={candidateColums(onSetSeeCandidate, status)}
        data={transformCandidateTableData(data)}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.candidate-list {
    margin-bottom: 25px;
  }
`;

CandidateLists.propTypes = propTypes;

CandidateLists.defaultProps = defaultProps;

export default CandidateLists;
