import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "contexts/app.context";
import { getAllUsers } from "services/user.service";
import TableData from "components/common/TableData";
import { transformAllUsersDataToTable } from "helpers/user.helper";
import { useNavigate, useParams } from "react-router-dom";
import { allUserColums, serviceColums, requestColums } from "./tableData";
import OptionPanel from "./components/OptionPanel";
import {
  showPendingPostService,
  retriveRequestRejectProject,
} from "services/admin.service";
import { transformPrivideServiceTableData } from "./helpers/table.helper";
import ContentLayout from "layouts/ContentLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setLoading } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [serviceData, setSerivceData] = useState([]);
  const [currentTab, setCurrentTab] = useState("seeUsers");
  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const { allUsersData } = await getAllUsers();
      const { payload: pendingServiceLists } = await showPendingPostService();
      const { payload: requests } = await retriveRequestRejectProject();
      const tableData = transformAllUsersDataToTable(allUsersData);
      const provideServiceData =
        transformPrivideServiceTableData(pendingServiceLists);
      setUsers(tableData);
      setSerivceData(provideServiceData);
      setRequestList(requests);
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
    } else {
      return { column: requestColums(navigate), data: requestList };
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
