import { useEffect } from "react";
import { Row, Col } from "antd";

import UploadImg from "components/image/UploadImg";

const Profile = () => {
  useEffect(() => {}, []);
  return (
    <div>
      Profile Page
      <Row>
        <Col span={24}>
          <UploadImg />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
