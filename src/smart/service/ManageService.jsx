import { useEffect, useContext, useState } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col, Button, Form } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import ContentLayout from "layouts/ContentLayout";
import ManageServiceForm from "./components/ManageServiceForm";
import OptionPanel from "./components/OptionPanel";

const ManageService = () => {
  const [form] = Form.useForm();
  const [serviceType, setServiceType] = useState("findService");//findService or findWork
  const [optionValue, setOptionValue] = useState({
    area: "",
    type: "",
    category: "",
  });
  const handleSelectOption = (key, e) => {
    setOptionValue({ ...optionValue, [key]: e.target.value });
  };
  const handleChangeServiceType = (e) =>{
    console.log('value iss',e.target.value)
    setServiceType(e.target.value);
  }
  return (
    <div className="add-service">
      <ContentLayout>
        <OptionPanel
          onSelectOptions={handleSelectOption}
          onChangeServiceType={handleChangeServiceType}
          isManage={true}
        />
        <ManageServiceForm serviceType={serviceType} form={form} />
      </ContentLayout>
    </div>
  );
};

export default ManageService;
