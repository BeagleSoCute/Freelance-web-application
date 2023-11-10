import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "contexts/app.context";
import TableData from "components/common/TableData";
import { useNavigate } from "react-router-dom";
import { serviceColums } from "./tableData";
import OptionPanel from "./components/OptionPanel";
import { transformPrivideServiceTableData } from "./helpers/table.helper.js";
import ContentLayout from "layouts/ContentLayout";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);
  const [serviceData, setSerivceData] = useState([]);
  const [currentTab, setCurrentTab] = useState("seeUsers");
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const provideServiceData =
        transformPrivideServiceTableData();
      setSerivceData(provideServiceData);
    };
    // init();
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  const handleChangeOption = (e) => {
    setCurrentTab(e.target.value);
  };
  const handleShowTableData = () => {
    if (currentTab === "seeUsers") {
      return 
    } else if (currentTab === "approveServices") {
      return { column: serviceColums(navigate), data: serviceData };
    }
  };
  return (
    <StyledDiv className="user-dashboard">
      <ContentLayout>
        <h1>Dashboard</h1>
        <OptionPanel onChangeOption={handleChangeOption} />
        <TableData
          columns={handleShowTableData()?.column}
          data={handleShowTableData()?.data}
        />
      </ContentLayout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.user-dashboard {
    height: 100vh;
    .myInfo {
      margin-bottom: 20px;
    }
  }
`;
export default UserDashboard;
