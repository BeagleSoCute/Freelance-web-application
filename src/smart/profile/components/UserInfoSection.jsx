import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import SkillTags from "components/skills/SkillTags";
import styled from "styled-components";

const propTypes = {
  userData: PropTypes.object,
};
const defaultProps = {
  userData: {},
};
const UserInfoSection = ({ userData }) => {
  return (
    <StyledDiv className="user-info-section">
      <Row justify="center">
        <Col span={7}></Col>
        <Col span={10} className="user-info-wrapper">
          <div>
            <img
              className="profile-picture"
              alt="profile-pic"
              src={userData.profile_picture}
            />
          </div>
          <p>
            <span className="bold-text">Name:</span> {userData.first_name}{" "}
            {userData.last_name}
          </p>
          <p>
            <span className="bold-text">Phone number:</span>{" "}
            {userData.phone_number}
          </p>

          <p>
            <span className="bold-text">Description:</span>{" "}
            {userData.description}
          </p>
          <div>
            <p className="bold-text">Skills: </p>
            <SkillTags items={userData.skills} />
          </div>
        </Col>
        <Col span={7}></Col>

      </Row>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.user-info-section {
    .user-info-wrapper {
    }
    .skill-tags {
      .item {
        padding: 0px 45px;
      }
    }
    .profile-picture {
      width: 250px;
      height: 250px;
    }
  }
`;
UserInfoSection.propTypes = propTypes;
UserInfoSection.defaultProps = defaultProps;
export default UserInfoSection;
