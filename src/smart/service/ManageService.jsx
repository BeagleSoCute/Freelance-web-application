import { useEffect, useContext, useState, useRef } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col, Button, Form, Select } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import ContentLayout from "layouts/ContentLayout";
import ManageServiceForm from "./components/ManageServiceForm";
import OptionPanel from "./components/OptionPanel";
import DisplayPortfolio from "components/portfolio/DisplayPortfolio";

const ManageService = () => {
  const navigate = useNavigate();
  const selectPortfolioRef = useRef();

  const {
    user,
    setLoading,
    setUser,
    viewPortfolio,
    addPortfolio,
    selectPortfolio,
  } = useContext(AppContext);
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
  const handleSelectOption = (key, e) => {
    setOptionValue({ ...optionValue, [key]: e.target.value });
  };
  const handleChangeServiceType = (e) => {
    setServiceType(e.target.value);
  };
  const handleAddPortfolio = (portfolioID) => {
    const selectedPortfolio = user.portfolios.find(item => item._id === portfolioID );
    const removeSelected = portfolioOptions.filter(
      (item) => item._id !== portfolioID
    );
    setPortfolioOptions(removeSelected);
    setRelatedPortfolio([...relatedPortfolio, selectedPortfolio]);
  };
  const handleRemovePortfolio = (portfolioID) => {
    const selectedPortfolio = user.portfolios.find(item => item._id === portfolioID );
    const removeSelected = relatedPortfolio.filter(
      (item) => item._id !== portfolioID
    );
    setPortfolioOptions([...portfolioOptions, selectedPortfolio]);
    setRelatedPortfolio(removeSelected);
  }
  const manageServiceFormProps = {
    serviceType,
    form,
    portfolios: portfolioOptions,
    onAddPortfolio: handleAddPortfolio,
  };
  return (
    <div className="manage-service">
      <ContentLayout isSubmit={true} onCancel={() => navigate("/service-list")}>
        <OptionPanel
          onSelectOptions={handleSelectOption}
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
