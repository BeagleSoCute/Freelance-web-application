import React from "react";
import styled from "styled-components";
import { Flex, Button } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
};

const defaultProps = {
  data: {},
  onSubmit: () => {},
  onBack: () => {},
};
const CandidateDetails = ({ data, onSubmit, onBack }) => {
  const navigate = useNavigate();
  return (
    <StyledDiv className="candidate-details">
      <Flex justify="space-between">
        <h2>Candidate Details</h2>
        <Button onClick={() => onBack()}>See all candidates</Button>
      </Flex>

      <p>
        <span className="bold-text">Name:</span>
        {data?.name}{" "}
        <Button onClick={() => navigate(`/profile/${data?.userID}`)}>
          See the candidate profile
        </Button>
      </p>
      <p>
        <span className="bold-text">Status:</span>
        {data?.status}
      </p>
      <p>
        <span className="bold-text">Date:</span>
        {data?.date}
      </p>
      <p className="bold-text">Description:</p>
      <p>{data?.description ? data?.description : "-"}</p>
      {data.status === "pending" && (
        <Flex justify="center" gap="large">
          <Button onClick={() => onSubmit("reject")} danger>
            Reject
          </Button>
          <Button onClick={() => onSubmit("approve")} type="primary">
            Approve
          </Button>
        </Flex>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.candidate-details {
    border: 1px solid black;
    padding: 20px;
    margin-bottom: 25px;
    span {
      margin-right: 5px;
    }
  }
`;

CandidateDetails.propTypes = propTypes;

CandidateDetails.defaultProps = defaultProps;

export default CandidateDetails;
