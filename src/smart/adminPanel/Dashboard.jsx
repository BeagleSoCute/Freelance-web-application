import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Button } from "antd";
import { AppContext } from "contexts/app.context";
import { getAllUsers } from "services/user.service";
import TableData from "components/common/TableData";
import { transformAllUsersDataToTable } from "helpers/user.helper";
import { useNavigate } from "react-router-dom";
import { allUserColums, serviceColums } from "./tableData";
import OptionPanel from "./components/OptionPanel";
import { showPendingPostService } from "services/admin.service";
import { transformPrivideServiceTableData } from "./helpers/table.helper";
import ContentLayout from "layouts/ContentLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setLoading } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [serviceData, setSerivceData] = useState([]);
  const [currentTab, setCurrentTab] = useState("seeUsers");
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const { allUsersData } = await getAllUsers();
      const { payload: pendingServiceLists } = await showPendingPostService();
      const tableData = transformAllUsersDataToTable(allUsersData);
      const provideServiceData =
        transformPrivideServiceTableData(pendingServiceLists);
      console.log("pendingServiceLists", provideServiceData);
      setUsers(tableData);
      setSerivceData(provideServiceData);
    };
    init();
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  const handleChangeOption = (e) => {
    setCurrentTab(e.target.value);
  };

  const handleShowTableData = () => {
    if (currentTab === "seeUsers") {
      return { column: allUserColums(navigate), data: users };
    } else if (currentTab === "approveServices") {
      return { column: serviceColums(navigate), data: serviceData };
    }
  };
  return (
    <StyledDiv className="dashboard">
      <ContentLayout>
        <h1>Dashboard</h1>
        <OptionPanel onChangeOption={handleChangeOption} />
        <TableData
          columns={handleShowTableData().column}
          data={handleShowTableData().data}
        />
      </ContentLayout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.dashboard {
    height: 100vh;
    .myInfo {
      margin-bottom: 20px;
    }
  }
`;
export default Dashboard;
