import { useEffect, useContext, useState } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col, Button, Form, Select } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import ContentLayout from "layouts/ContentLayout";
import ManageServiceForm from "./components/ManageServiceForm";
import OptionPanel from "./components/OptionPanel";
import DisplayPortfolio from "components/portfolio/DisplayPortfolio";
import { addFindService, addProvideService } from "services/service.service";
import { getCurrentDate } from "helpers/date.helper";

const ManageService = () => {
  const navigate = useNavigate();
  const { user, setLoading } = useContext(AppContext);
  const [form] = Form.useForm();
  const [serviceType, setServiceType] = useState("findService"); //findService or provideSerivce
  const [portfolioOptions, setPortfolioOptions] = useState([]);
  const [relatedPortfolio, setRelatedPortfolio] = useState([]);
  const [optionValue, setOptionValue] = useState({
    area: "",
    type: "",
    category: "",
  });

  useEffect(() => {
    const init = () => {
      if (user) {
        setPortfolioOptions(user.portfolios);
      }
    };
    init();
  }, [user]);
  const handleSelectOption = (key, value) => {
    setOptionValue({ ...optionValue, [key]: value });
  };
  const handleChangeServiceType = (e) => {
    console.log("handleChangeServiceType", e.target.value);
    setServiceType(e.target.value);
  };
  const handleAddPortfolio = (portfolioID) => {
    const selectedPortfolio = user.portfolios.find(
      (item) => item._id === portfolioID
    );
    const removeSelected = portfolioOptions.filter(
      (item) => item._id !== portfolioID
    );
    setPortfolioOptions(removeSelected);
    setRelatedPortfolio([...relatedPortfolio, selectedPortfolio]);
  };
  const handleRemovePortfolio = (portfolioID) => {
    const selectedPortfolio = user.portfolios.find(
      (item) => item._id === portfolioID
    );
    const removeSelected = relatedPortfolio.filter(
      (item) => item._id !== portfolioID
    );
    setPortfolioOptions([...portfolioOptions, selectedPortfolio]);
    setRelatedPortfolio(removeSelected);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let success;
    let payload;
    const transformData = {
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      type: optionValue.type,
      area: optionValue.area,
      category: optionValue.category,
    };
    if (serviceType === "findService") {
      console.log("transformData", transformData);
      const res = await addFindService(transformData);
      success = res.success;
      payload = res.payload;
    } else {
      const provideServiceData = {
        ...transformData,
        related_portfolios: relatedPortfolio.map((item) => item._id),
      };
      console.log("provideServiceData",provideServiceData);
      const res = await addProvideService(provideServiceData);
      success = res.success;
      payload = res.payload;
    }
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Create a post Success" });
      // navigate("/profile");
    } else {
      notification({
        type: "error",
        message: "Can not create a post, please contract admin!",
      });
    }
  };

  const manageServiceFormProps = {
    serviceType,
    form,
    portfolios: portfolioOptions,
    onAddPortfolio: handleAddPortfolio,
  };

  return (
    <div className="manage-service">
      <ContentLayout
        isSubmit={true}
        onSubmit={() => handleSubmit()}
        onCancel={() => navigate("/service-list")}
      >
        <OptionPanel
          onSelectOption={handleSelectOption}
          onChangeServiceType={handleChangeServiceType}
          isManage={true}
        />
        <ManageServiceForm {...manageServiceFormProps} />
        {serviceType === "provideService" && (
          <>
            <DisplayPortfolio
              title="Related works"
              isHideAddBtn={true}
              isDeleteOnly={true}
              portfolios={relatedPortfolio}
              onDelete={handleRemovePortfolio}
            />
          </>
        )}
      </ContentLayout>
    </div>
  );
};

const StyledDiv = styled.div`
  &.manage-service {
    /* display: flex;
    justify-content: center; */
  }
`;

export default ManageService;
