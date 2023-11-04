import { useEffect, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import ContentLayout from "layouts/ContentLayout";
import ManageServiceForm from "./components/ManageServiceForm";
import SearchFilter from "./components/OptionPanel";

const ManageService = () => {
  return (
    <div className="add-service">
      <ContentLayout>
        <SearchFilter/>
        <ManageServiceForm />
      </ContentLayout>
    </div>
  );
};

export default ManageService;
