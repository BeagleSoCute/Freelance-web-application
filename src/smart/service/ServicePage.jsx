import { useEffect, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import ContentLayout from "layouts/ContentLayout";
import TableData from "components/common/TableData";
import { serviceColums } from "./table/tableColumn";

const ServicePage = () => {
    const navigate = useNavigate()
  useEffect(() => {}, []);
  return (
    <div>
      <ContentLayout>
        <TableData columns={serviceColums(navigate)} />
      </ContentLayout>
    </div>
  );
};

export default ServicePage;
