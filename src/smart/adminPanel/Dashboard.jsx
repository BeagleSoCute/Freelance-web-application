import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "contexts/app.context";
import { getAllUsers } from "services/user.service";
import TableData from "components/common/TableData";
import { transformAllUsersDataToTable } from "helpers/user.helper";
import { useNavigate, useParams } from "react-router-dom";
import { allUserColums, serviceColums, requestColums, transactionColums } from "./tableData";
import OptionPanel from "./components/OptionPanel";
import { notification } from "helpers/notification.helper";
import {
  showPendingPostService,
  retriveRequestRejectProject,
  approveRejectProject,
} from "services/admin.service";
import { transformPrivideServiceTableData } from "./helpers/table.helper";
import ContentLayout from "layouts/ContentLayout";
import { showAllTransactionData, refundMoneyData } from "services/escrow.service";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setLoading } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [serviceData, setSerivceData] = useState([]);
  const [currentTab, setCurrentTab] = useState("seeUsers");
  const [requestList, setRequestList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const { allUsersData } = await getAllUsers();
      const { payload: pendingServiceLists } = await showPendingPostService();
      const { payload: requests } = await retriveRequestRejectProject();
      const allTransactionData = await showAllTransactionData();

      const tableData = transformAllUsersDataToTable(allUsersData);
      const provideServiceData =
        transformPrivideServiceTableData(pendingServiceLists);
      setUsers(tableData);
      setSerivceData(provideServiceData);
      setRequestList(requests);
      setTransactionList(allTransactionData.payload);
    };
    init();
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  const handleChangeOption = (e) => {
    setCurrentTab(e.target.value);
  };
  const handleApproveRequest = async (isApprove, projectID) => {
    const { success } = await approveRejectProject(isApprove, projectID);

    if (success) {
      notification({ type: "success", message: "Take an action Success" });
      navigate("/admin-panel");
    } else {
      notification({
        type: "error",
        message: "Take an action fail, please try again later!",
      });
    }
  };
  const handleRefund = async (value, projectID, transactionID) => {
    const { success } = await refundMoneyData(value, projectID, transactionID);
    if (success) {
      notification({ type: "success", message: "Refund Success" });
      navigate("/admin-panel");
    } else {
      notification({
        type: "error",
        message: "Refund fail, please try again later!",
      });
    }
  };
  
  
  const handleShowTableData = () => {
    if (currentTab === "seeUsers") {
      return { column: allUserColums(navigate), data: users };
    } else if (currentTab === "approveServices") {
      return { column: serviceColums(navigate), data: serviceData };
    } else if (currentTab === "seeRequest") {
      return {
        column: requestColums(navigate, handleApproveRequest),
        data: requestList,
      };
    } else if (currentTab === "seeTransaction") {
      return { column: transactionColums(navigate, handleRefund), data: transactionList };
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
